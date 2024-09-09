const Jimp = require("jimp");
const qrcode = require("qrcode-reader");
const { read } = require("jimp");

async function ScanQr(req , res) {
  const { qrData } = req.body;
  
  if (!qrData || typeof qrData !== 'string') {
    return res.status(400).json({ message: 'Invalid QR data' });
  }

  console.log('QR Data received:', qrData);
  res.status(200).json({ message: 'QR Data received successfully' });
}


exports.ScanQr = ScanQr;
