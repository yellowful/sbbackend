const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageurl = require('./controllers/imageurl');
const Clarifai = require('clarifai');


var db = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      user : 'epxewlvxoqsjsa',
      password : '',
      database : 'smartbrain_db'
    }
  });

const apiClarifai = new Clarifai.App({
apiKey: 'a40220c771334acaafb67dd020f7f9d0'
});

const app = express();


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

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

app.listen(process.env.PORT || 3000,()=>{
    console.log(`sbbackend is running on port ${process.env.PORT}`)
});