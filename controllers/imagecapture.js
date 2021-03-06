const handleImageCapture = (captureWebsite) => (req, res) => {
    
    const { captureUrl } = req.body;
    const captureFilename = process.pid.toString() + "-" + Date.now().toString() + ".png";
    const fullFilename = "public/"+captureFilename;
    console.log('capture filename',fullFilename);
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
            console.log('capture err message',err);
        }
    })();
}

module.exports = {
    handleImageCapture: handleImageCapture
}