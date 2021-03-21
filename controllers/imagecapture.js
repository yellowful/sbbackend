const handleImageCapture = (captureWebsite) => (req, res) => {
    
    const { captureUrl } = req.body;
    const captureFilename = process.pid.toString() + "-" + Date.now().toString() + ".png";
    const fullFilename = "public/"+captureFilename;
    (async () => {
        try {
            await captureWebsite.file(captureUrl, fullFilename);
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