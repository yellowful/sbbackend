const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register')
const signin = require('./controllers/signin');
//const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageurl = require('./controllers/imageurl');
const imageupload = require('./controllers/imageupload');
const Clarifai = require('clarifai');
const multer  = require('multer');
//用來把route來的檔案改檔名存在express的靜態網站上
const path = require('path');
//用來取得副檔名
const fs = require('fs');


var db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false}
    }
  });//for heroku

    // var db = require('knex')({
    //     client: 'pg',
    //     connection: {
    //     host : '127.0.0.1',
    //     user : 'RichardHuang',
    //     password : '',
    //     database : 'smartbrain_db'
    //     }
    // });//only for development


const app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));



app.get('/',(req,res)=>{res.send('backend connected')})

app.post('/signin',signin.handleSignIn(bcrypt,db));
//handleSignIn是一個currying，bcrypt和db傳入後，會回傳一個function，這個function是只有兩個引數。
//app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,bcrypt,db)});

app.post('/register',register.handleRegister(bcrypt,db));
//app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)});

//app.get('/profile/:id',profile.handleProfile(db));
//app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});
//這邊其實沒什麼用處，或許可以弄個管理後端的介面可以使用，這裡不執行以防被亂輸入id竊資料

app.put('/image',image.handleImage(db));
//app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.post('/imageurl',imageurl.handleImageUrl(Clarifai,fs));

app.post('/upload',imageupload.handleImageUpload(multer,path));

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`sbbackend is running on port ${process.env.PORT}`)
});