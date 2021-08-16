// 用來讓使用次數+1的功能
const handleImage = (db)=>(req,res)=>{
    // knex用來SELECT * FROM users
    db('users')
    // WHERE email = req.body.email;
    .where('email',req.body.email)
    // 在entries這欄+1
    .increment('entries',1)
    // 回傳資料庫回傳這個column的所有東西
    .returning('*')
    // 把使用者的資料丟回前端
    .then(userUpdated=>{
        res.json(userUpdated);
    })
    // 錯誤的話，回傳400的status給前端
    .catch(err=>{
        res.status(400).send('not found');
    })      
}

module.exports={
    handleImage:handleImage
}
