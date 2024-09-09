const express = require("express");
const routes = express.Router();

const generateQr = require("../controllers/qrcode/generateQr");

routes
    .post("/generateQr", generateQr.generateQr);

exports.route = routes;