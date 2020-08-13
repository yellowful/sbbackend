const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageurl = require('./controllers/imageurl');
const imageupload = require('./controllers/imageupload');
const Clarifai = require('clarifai');
const multer  = require('multer');
//用來把route來的檔案改檔名存在express的靜態網站上
const path = require('path');
//用來取得副檔名


var db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false}
    }
  });

const apiClarifai = new Clarifai.App({
apiKey: process.env.clarifaiApiKey
});

const app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination:'./public',
    filename:(req,file,cb)=>{
        cb(null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    //原則上設定的parameter都是req,file,cb，由cb來決定值是什麼
    //fieldname代表前端傳過來的檔名，originalname代表前端使用者上傳時最原始的檔名
    }
})//存檔的檔名設定，必須在upload之前

const fileFilter = (req, file, cb) => {
    const typesAccepted = ['.jpeg','.jpg','.png','.tiff','.tif','.bmp','.webp'];
    //clarifai接受的檔案類型
    const isTypeCorrect = typesAccepted.includes(path.extname(file.originalname).toLowerCase());
    //最原始檔名的副檔名，是否符合clarifai的接受類型
    if(isTypeCorrect){
        cb(null, true)
        //接受檔案
    } else {
        cb(null, false, new Error('something wrong'));
        //不接受檔案
    }
}//過濾檔案類型，必須在upload之前


const upload = multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter: fileFilter
 }).single('uploadfile')
//設定upload這個物件
//只接收前端傳來檔名uploadfile的一個檔案



app.get('/',(req,res)=>{res.send('connected')})

app.post('/signin',signin.handleSignIn(bcrypt,db));
//handleSignIn是一個currying，bcrypt和db傳入後，會回傳一個function，這個function是只有兩個引數。
//app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,bcrypt,db)});

app.post('/register',register.handleRegister(bcrypt,db));
//app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)});

app.get('/profile/:id',profile.handleProfile(db));
//app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

app.put('/image',image.handleImage(db));
//app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl',imageurl.handleImageUrl(apiClarifai));

app.post('/upload',imageupload.handleImageUpload(upload));

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`sbbackend is running on port ${process.env.PORT}`)
});