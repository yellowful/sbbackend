// 已經沒有用這個endpoint了
// 由前端得到id，然後由id向後端取得使用者資料，然後把使用者資料傳到前端去
const handleProfile = (db)=>(req,res)=>{   
    // 用knex做SELECT * FROM users
    db.select()
    .from('users')
    // WHERE id=req.params.id;
    .where({id:req.params.id})
    // 收到的資料回傳前端
    .then(currentUser => {
        res.json(currentUser);
    })
    .catch(err=>res.status(403).json('user not found'))    
}

module.exports= {
    handleProfile: handleProfile
}