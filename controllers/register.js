const handleRegister = (bcrypt, db) => (req,res) => {
    const isValidUser = req.body.name==='' || req.body.email==='' || req.body.password==='';
    //三個欄位不能有一個空白
    if(!isValidUser){
        const hash = bcrypt.hashSync(req.body.password);
        //把使用者傳過來的密碼加密
        db.transaction(trx => {
            //以下是transaction的第一段開始，把這個person的email和hash寫入login的table，並要求資料庫回傳login裡這個person的email欄
            //回傳的email就是.then裡的resEmail
            trx.insert(
                {
                    email:req.body.email,
                    hash: hash
                })
            .into('login')
            .returning('email')
            .then(resEmail => {
                //以上是transaction的第一端結束，以下是transaction的第二段開始
                //把資料放入users的table中，並回傳users的table中，這個person的所以資料
                return trx('users').insert({name: req.body.name, email:resEmail[0], joined: new Date})
                .returning('*')
                .then(resUsers =>{
                    res.json(resUsers[0]);
                    //把資料庫回傳這個person的所有資料傳給前端
                })
                .catch(err => res.status(403).json('database error'))
                //資料庫錯誤時，通知前端
            })  
            .then(trx.commit)
            //如果沒問題的話就結束transaction
            .catch(trx.rollback);
            //如果有問題，就退回，資料庫就會連第一個transaction的資料也刪掉
        })       
    } else {
        res.status(403).json('empty now allowed')
        //如果收到空白就向前端報錯
    }
}

module.exports = {
    handleRegister: handleRegister
}
