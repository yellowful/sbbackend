const handleSignIn =(bcrypt,db)=>(req,res,)=>{  
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
}

module.exports = {
    handleSignIn:handleSignIn
}