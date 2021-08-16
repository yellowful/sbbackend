// 用來截圖存檔的功能
const handleImageCapture = (captureWebsite) => (req, res) => {
    // 前端送來的非相片網址
    const { captureUrl } = req.body;
    // 產生一個臨時的檔名
    const captureFilename = process.pid.toString() + "-" + Date.now().toString() + ".png";
    // 產生一個放置相片的路徑
    const fullFilename = "public/"+captureFilename;
    // captureWebsite要放三個parameter
    // 第一個是要截圖的網址
    // 第二個是要存檔的路徑和檔名
    // 第三個是選項設定
    // 因為heroku後端我們沒有另外設定sandbox給captureWebsite用，而且也沒有安全性問題，所以設定成no sandbox
    (async () => {
        try {
            await captureWebsite.file(captureUrl, fullFilename,{
                launchOptions: {
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox'
                    ]
                }
            });
            await res.status(200).json(captureFilename);
        }
        catch (err) {
            res.status(403).json('none image capture error')
        }
    })();
}

module.exports = {
    handleImageCapture: handleImageCapture
}