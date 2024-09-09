import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

function QRCodeScanner() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);

  const handleScan = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const response = await axios.post('http://localhost:4001/qrcode/scanQr', { qrCodeImage: imageSrc });
      setData(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error scanning QR code:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <Webcam audio={false} ref={webcamRef} />
      <button onClick={handleScan}>Scan</button>
      {data && <p>QR Code Data: {data}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default QRCodeScanner;