const express = require('express');
var cors = require('cors');
const bcrypt = require('bcrypt-nodejs')

var db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'RichardHuang',
      password : '',
      database : 'smartbrain_db'
    }
  });

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('connected success')
})

app.post('/signin',(req,res)=>{  
    db.select()
    .from('login')
    .where({
        'email':req.body.email
    })
    .then(userSlected =>{
        if(bcrypt.compareSync(req.body.password, userSlected[0].hash)){
            return userSlected[0].email
        } else {
            res.json.status(404).json('not found');
        }       
    })
    .then(emailSlected => {
        db.select()
        .from('users')
        .where({email: emailSlected})
        .then(currentUser => {
            res.json(currentUser);
        })
    })
    .catch(err=>res.status(404).json('not found'))    
}) 


app.post('/register',(req,res)=>{
    const isValidUser = req.body.name==='' || req.body.email==='' || req.body.password==='';
    if(!isValidUser){
        const hash = bcrypt.hashSync(req.body.password);
        db.transaction(trx => {
            trx.insert(
                {
                    email:req.body.email,
                    hash: hash
                })
            .into('login')
            .returning('email')
            .then(resEmail => {
                return trx('users').insert({name: req.body.name, email:resEmail[0], joined: new Date})
                .returning('*')
                .then(resUsers =>{
                    res.json(resUsers[0]);
                })
                .catch(err => res.status(404).json('fail'))
            })  
            .then(trx.commit)
            .catch(trx.rollback);          
        })       
    } else {
        res.status(404).json('fail')
    }
})

app.get('/profile/:id',(req,res)=>{   
    db.select()
    .from('users')
    .where({id:req.params.id})
    .then(currentUser => {
        res.json(currentUser);
    })
    .catch(err=>res.status(404).json('not found'))    
})

app.put('/image',(req,res)=>{
    db('users')
    .where('email',req.body.email)
    .increment('entries',1)
    .returning('*')
    .then(userUpdated=>{
        res.json(userUpdated);
    })
    .catch(err=>{
        res.status(400).send('not found');
    })      
})

app.listen(3000);