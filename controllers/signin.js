// 用來處理登入
const handleSignIn =(bcrypt,db)=>(req,res,)=>{  
    // 依email找出使用者
    // SELECT * FROM login
    // WHERE email = req.body.email;
    db.select()
    .from('login')
    .where({
        'email':req.body.email
    })
    .then(userSlected =>{
        // req.body.password使用者輸入的密碼，userSlected[0].hash資料庫儲存的hash過的密碼
        // 兩相比對，如果正確就回傳使用者資料，不正確就向前端報錯
        if(bcrypt.compareSync(req.body.password, userSlected[0].hash)){
            return userSlected[0].email
        } else {
            res.json.status(403).json('email or password error');
        }       
    })
    // 因為沒有需要同步寫入的需求，所以不用transaction
    // emailSelected是前一個.then()所return回來的email
    // 跟據email找到user所有的資料，丟給前端
    .then(emailSlected => {
        // SELECT * FROM users
        // WHERE email = emailSlected;
        db.select()
        .from('users')
        .where({email: emailSlected})
        .then(resUsers => {
            res.json(resUsers[0]);
        })
    })
    // 出錯就丟403的status給前端
    .catch(err=>res.status(403).json('email or password error'))    
}

module.exports = {
    handleSignIn:handleSignIn
}