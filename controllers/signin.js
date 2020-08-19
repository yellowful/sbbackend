const handleSignIn =(bcrypt,db)=>(req,res,)=>{  
    db.select()
    .from('login')
    .where({
        'email':req.body.email
    })
    //依email找出使用者
    .then(userSlected =>{
        if(bcrypt.compareSync(req.body.password, userSlected[0].hash)){
            return userSlected[0].email
        } else {
            res.json.status(403).json('email or password error');
        }       
    })
    //req.body.password使用者輸入的密碼，userSlected[0].hash資料庫儲存的加密密碼
    //兩相比對，如果正確就回傳使用者資料，不正確就向前端報錯
    .then(emailSlected => {
        db.select()
        .from('users')
        .where({email: emailSlected})
        .then(currentUser => {
            res.json(currentUser);
        })
    })
    //因為沒有需要同步寫入的需求，所以不用transaction
    //emailSelected是前一個.then()所return回來的，出錯就告訴前端
    .catch(err=>res.status(403).json('email or password error'))    
}

module.exports = {
    handleSignIn:handleSignIn
}