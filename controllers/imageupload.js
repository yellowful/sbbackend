const handleImageUpload = (upload) => (req,res) => {
    upload(req, res, (err) => {
        if (err) {
          // An unknown error occurred when uploading.
          res.status(500).json('upload unknown error');
        } else if (!req.file){
        //如果檔案類型不符，告訴前端
            res.status(403).json('image type error');           
        } else {
            res.json(req.file.filename);
            //回傳檔名就好，讓前端自己去算url
        }     
        // Everything went fine.
      })
      //原本只是upload()的執行，但是upload可以處理err，所以可以給他處理err 
}

module.exports={
    handleImageUpload:handleImageUpload
}