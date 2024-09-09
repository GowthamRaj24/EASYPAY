const express = require("express");
const routes = express.Router();

const ScanQr = require("../controllers/qrcode/scanQr");
const generateQr = require("../controllers/qrcode/generateQr");

routes
    .post("/generateQr" , generateQr.generateQr)
    .post("/scanQr", ScanQr.ScanQr);

exports.route = routes;