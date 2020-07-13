const handleRegister = (bcrypt, db) => (req,res) => {
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
}

module.exports = {
    handleRegister: handleRegister
}
