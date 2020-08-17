
const handleImageUrl = (apiClarifai,fs)=>(req,res)=>{
    apiClarifai.models.predict("e466caa0619f444ab97497640cefc4dc",req.body.clarifaiImageURL)
    //連接名人辨識模組api
    //前面的長碼是名人辨識的模組代碼，URL是要辨識的網路圖片來源的網址
    .then(response => {
        res.json(response)
        if(req.body.backendField){
            fs.unlink(
                `./upload/${req.body.backendFileName}`,
                err=>{console.log('delete file error')}
            )
        }
    })
    .catch(err=>{res.json('fetch failed')})
}

module.exports= {
    handleImageUrl:handleImageUrl
}