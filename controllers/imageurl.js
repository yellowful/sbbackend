


const handleImageUrl = (Clarifai,fs)=>(req,res)=>{
    const apiClarifai = new Clarifai.App({
        apiKey: process.env.clarifaiApiKey
    });
    apiClarifai.models.predict("e466caa0619f444ab97497640cefc4dc",req.body.clarifaiImageURL)
    //連接名人辨識模組api
    //前面的長碼是名人辨識的模組代碼，clarifaiImageURL是要辨識的網路圖片來源的網址
    //backendFileName是前端傳過來，後端圖片檔案名稱
    .then(response => {
        if(req.body.backendFileName){
            fs.unlink(
                `./upload/${req.body.backendFileName}`,
                err=>{
                    console.log('delete file error',err);
                }
            )
        }
        //如果clarifai有回傳了，不管回傳什麼，都把後端對應的圖片刪除
        //把clarifai的結果傳給前端
        res.json(response)
    })
    .catch(err=>{res.status(500).json('fetch api failed')})
}

module.exports= {
    handleImageUrl:handleImageUrl
}