
const handleImageUrl = (apiClarifai,fs)=>(req,res)=>{
    // console.log('req.body.backendFileName',req.body.backendFileName,
    // 'req.body.clarifaiImageURL',req.body.clarifaiImageURL);
    apiClarifai.models.predict("e466caa0619f444ab97497640cefc4dc",req.body.clarifaiImageURL)
    //連接名人辨識模組api
    //前面的長碼是名人辨識的模組代碼，URL是要辨識的網路圖片來源的網址
    .then(response => {
        if(req.body.backendFileName){
            fs.unlink(
                `./upload/${req.body.backendFileName}`,
                err=>{console.log('delete file error')}
            )
        }
        res.json(response)
    })
    .catch(err=>{res.json('fetch failed')})
}

module.exports= {
    handleImageUrl:handleImageUrl
}