// QRCodeScanner.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = () => {
    const [scannedData, setScannedData] = useState(null); // Store the scanned data

    const handleScan = (result) => {
        if (result) {
            setScannedData(result); 
        }
    };

    const handleError = (error) => {
        console.error(error); 
    };

    return (
        <div>
            <h2>QR Code Scanner</h2>
            
            <QrReader
                constraints={{ facingMode: 'environment' }} // Use the rear camera (environment)
                onResult={(result, error) => {
                    if (!!result) {
                        handleScan(result?.text); // Capture the scanned result
                    }

                    if (!!error) {
                        handleError(error);
                    }
                }}
                style={{ width: '100%' }} // Adjust the scanner size
            />

            {/* Display the scanned QR code data */}
            {scannedData && (
                <div>
                    <h3>Scanned Data:</h3>
                    <p>{scannedData}</p>
                </div>
            )}
        </div>
    );
};

export default QRCodeScanner;
