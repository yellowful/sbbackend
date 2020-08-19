
const handleProfile = (db)=>(req,res)=>{   
    db.select()
    .from('users')
    .where({id:req.params.id})
    .then(currentUser => {
        res.json(currentUser);
    })
    //這邊其實沒什麼用處，或許可以弄個管理後端的介面可以使用
    //由前端得到id，然後由id向後端取得使用者資料，然後把使用者資料傳到前端去
    .catch(err=>res.status(403).json('user not found'))    
}

module.exports= {
    handleProfile: handleProfile
}