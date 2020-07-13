
const handleImage = (db)=>(req,res)=>{
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
}

module.exports={
    handleImage:handleImage
}
