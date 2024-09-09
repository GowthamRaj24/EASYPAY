const QRCode = require('qrcode');

const generateQr = (async (req, res) => {
    
    try {
        const data = req.body.userId; 
        if (!data || typeof data !== 'string') {
            return res.status(400).json({ message: 'Invalid data' });
        }
        console.log(data);
        const qrCode = await QRCode.toDataURL((data));
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating QR code' });
    }
});

exports.generateQr = generateQr;