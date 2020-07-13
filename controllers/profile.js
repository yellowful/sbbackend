
const handleProfile = (db)=>(req,res)=>{   
    db.select()
    .from('users')
    .where({id:req.params.id})
    .then(currentUser => {
        res.json(currentUser);
    })
    .catch(err=>res.status(404).json('not found'))    
}

module.exports= {
    handleProfile: handleProfile
}