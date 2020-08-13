
const handleImageUrl = (apiClarifai)=>(req,res)=>{
    apiClarifai.models.predict("e466caa0619f444ab97497640cefc4dc",req.body.clarifaiImageURL)
    //連接名人辨識模組api
    //前面的長碼是名人辨識的模組代碼，URL是要辨識的網路圖片來源的網址
    .then(response => {
        res.json(response)})
    .catch(err=>{res.json('fetch failed')})
}

module.exports= {
    handleImageUrl:handleImageUrl
}