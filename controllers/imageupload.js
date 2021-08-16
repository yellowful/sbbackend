// 用來處理上傳的檔案
const handleImageUpload = (multer,path) => (req,res) => {
    // multer是用來收取前端檔案，轉存檔案在server上的套件
    // .disStorage()可以設定存檔的檔名，必須在upload之前
    // 輸入的參數是一個object，檔名filename的value是一個function
    // 這個function有三個參數，api會把檔案丟給file，我們可以靠這個function設定自己要的檔名
    const storage = multer.diskStorage({
        // './public'是絕對位置的寫法，可以改成'public/'相對位置的寫法
        // 原則上設定的parameter都是req,file,cb，由cb來決定值是什麼
        // fieldname代表前端傳過來的檔名，originalname代表前端使用者上傳時最原始的檔名
        // path.extname是取得原始檔名的副檔名
        destination:'./public',
        filename:(req,file,cb)=>{
            cb(null,
                file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname)
            )
        }
    })
    // multer的api也是收一個object的參數，這個參數有一個fileFilter的attribute
    // 這個attribute的value是一個function，可以設定過濾檔案類型，必須放在upload之前
    // api會丟給這個function三個參數，我們要讓cb知道什麼時候接受檔案，什麼時候不接受檔案
    const fileFilter = (req, file, cb) => {
        // clarifai接受的檔案類型
        const typesAccepted = ['.jpeg','.jpg','.png','.tiff','.tif','.bmp','.webp'];
        // 最原始檔名的副檔名，是否符合clarifai的接受類型
        const isTypeCorrect = typesAccepted.includes(path.extname(file.originalname).toLowerCase());
        if(isTypeCorrect){
            // 接受檔案
            cb(null, true)
        } else {
            // 不接受檔案
            cb(null, false, new Error('something wrong'));
        }
    }
    // 設定upload這個物件
    // .single()的method代表只接收前端傳來檔名uploadfile的一個檔案，接收的名稱是uploadfile
    // storage就是用.diskStorage()設定的，fileFilter前面設定的function
    const upload = multer({
        storage:storage,
        limits:{fileSize:10000000},
        fileFilter: fileFilter
     }).single('uploadfile')

    
    // 原本只是upload()的執行，但是upload可以處理err，所以可以給他處理err 
    // 第三個參數就是處理err的function
    upload(req, res, (err) => {
        if (err) {
          // An unknown error occurred when uploading.
          res.status(500).json('upload unknown error');
          console.log(err);
        // 如果檔案類型不符，告訴前端
        } else if (!req.file){
            res.status(403).json('image type error');           
        // 一切正常的話，回傳檔名就好，讓前端自己去算url
        } else {
            res.json(req.file.filename);
        }     
      })
}

module.exports={
    handleImageUpload:handleImageUpload
}

