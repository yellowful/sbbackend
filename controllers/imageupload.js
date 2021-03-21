const handleImageUpload = (multer,path) => (req,res) => {

    const storage = multer.diskStorage({
        destination:'./public',
        filename:(req,file,cb)=>{
            cb(null,
                file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname)
            )
        //'./public'是絕對位置的寫法，可以改成'public/'相對位置的寫法
        //原則上設定的parameter都是req,file,cb，由cb來決定值是什麼
        //fieldname代表前端傳過來的檔名，originalname代表前端使用者上傳時最原始的檔名
        //path.extname是取得原始檔名的副檔名
        }
    })//存檔的檔名設定，必須在upload之前
    
    const fileFilter = (req, file, cb) => {
        const typesAccepted = ['.jpeg','.jpg','.png','.tiff','.tif','.bmp','.webp'];
        //clarifai接受的檔案類型
        const isTypeCorrect = typesAccepted.includes(path.extname(file.originalname).toLowerCase());
        //最原始檔名的副檔名，是否符合clarifai的接受類型
        if(isTypeCorrect){
            cb(null, true)
            //接受檔案
        } else {
            cb(null, false, new Error('something wrong'));
            //不接受檔案
        }
    }//過濾檔案類型，必須放在upload之前
    
    const upload = multer({
        storage:storage,
        limits:{fileSize:10000000},
        fileFilter: fileFilter
     }).single('uploadfile')
    //設定upload這個物件
    //只接收前端傳來檔名uploadfile的一個檔案
    
    upload(req, res, (err) => {
        if (err) {
          // An unknown error occurred when uploading.
          res.status(500).json('upload unknown error');
          console.log(err);
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

