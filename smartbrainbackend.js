const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register')
const signin = require('./controllers/signin');
//const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageurl = require('./controllers/imageurl');
const imageupload = require('./controllers/imageupload');
const imagecapture = require('./controllers/imagecapture');
const Clarifai = require('clarifai');
// 用來把route來的檔案改檔名存在express的靜態網站上
const multer  = require('multer');
const captureWebsite = require('capture-website');
// 用來取得副檔名
const path = require('path');
const fs = require('fs');

// for heroku
var db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false}
    }
  });

    // var db = require('knex')({
    //     client: 'pg',
    //     connection: {
    //     host : '127.0.0.1',
    //     user : 'RichardHuang',
    //     password : '',
    //     database : 'smartbrain_db'
    //     }
    // });//only for development

// 架設伺服器
const app = express();

// 給put和post用的，主要用來辨識body裡面是不是string或是object
app.use(express.urlencoded({extended:false}));
// 給put和post用的，主要用來辨識body裡面是不是JSON
app.use(express.json());
// 用來回傳head，讓chrome允許前端cross origin
app.use(cors());
// 建立靜態網站
app.use(express.static('public'));


// 前端用來叫醒heroku後端
app.get('/',(req,res)=>{res.send('backend connected')})

// handleSignIn是一個currying，bcrypt和db傳入後，會回傳一個 callback function，這個callback function需要兩個parameter，也就是req和res。
// 第一個signin是檔名，後面的handleSignIn是object的key
// 主要用來進行登入
app.post('/signin',signin.handleSignIn(bcrypt,db));
//app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,bcrypt,db)});

// 主要用來進行註冊
app.post('/register',register.handleRegister(bcrypt,db));
//app.post('/register',(req,res)=>{register.handleRegister(req,res,bcrypt,db)});

// 這邊其實沒什麼用處，或許可以弄個管理後端的介面可以使用，這裡不執行以防被亂輸入id竊資料
//app.get('/profile/:id',profile.handleProfile(db));
//app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

// 用來讓資料庫對使用資數加1
app.put('/image',image.handleImage(db));
//app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

// 讓後端把送來的網址丟去clarifai
app.post('/imageurl',imageurl.handleImageUrl(Clarifai,fs));

// 讓前端送來的圖片檔存到靜態網站上
app.post('/upload',imageupload.handleImageUpload(multer,path));

// 將前端送來的網址進行截圖
app.post('/capture',imagecapture.handleImageCapture(captureWebsite));

// 列出伺服器監聽的port
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`sbbackend is running on port ${process.env.PORT}`)
});