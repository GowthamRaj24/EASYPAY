import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');

  useEffect(() => {
    // Initialize scanner when the component mounts
    const html5QrCodeScanner = new Html5QrcodeScanner(
      "reader", 
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 } 
      },
      false
    );

    const onScanSuccess = (decodedText, decodedResult) => {
      setScanResult(decodedText);
      console.log(`QR Code scanned: ${decodedText}`);
      // Optionally send the result to the backend
      sendToBackend(decodedText);
      html5QrCodeScanner.clear();
    };

    const onScanFailure = (error) => {
      console.warn(`QR Code scan error: ${error}`);
    };

    html5QrCodeScanner.render(onScanSuccess, onScanFailure);

    // Clean up scanner on component unmount
    return () => {
      html5QrCodeScanner.clear();
    };
  }, []);

  // Function to send scanned data to backend
  const sendToBackend = async (data) => {
    try {
      const response = await fetch('/api/qrscan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData: data }),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error sending QR data to backend', error);
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader" style={{ width: '500px' }}></div>
      <p>Scanned Result: {scanResult}</p>
    </div>
  );
};

export default QrCodeScanner;
