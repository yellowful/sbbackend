const handleImageUpload = (upload) => (req,res) => {
    upload(req, res, (err) => {
        if (err) {
          // An unknown error occurred when uploading.
          res.status(403).json('unknown error');
        } else if (!req.file){
            res.status(403).json('type error');           
        } else {
            //res.json(`http://localhost:3001/${req.file.filename}`);
            res.json(req.file.filename);
            //process.env.BACKEND_URL
        }     
        // Everything went fine.
      })
      //原本只是upload()的執行，但是upload可以處理err，所以可以給他處理err 
}

module.exports={
    handleImageUpload:handleImageUpload
}