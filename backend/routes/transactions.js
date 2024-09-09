const express = require('express');
const routes = express.Router();

const checkBalance = require('../controllers/transactions/checkBalance');
const sendMoney = require('../controllers/transactions/sendMoney');
const transactionHistory = require('../controllers/transactions/transactionHistory');
const RazorPay = require('../controllers/transactions/razorPay');
const successrazorPay = require('../controllers/transactions/successrazorPay');

routes
    .post('/sendMoney' , sendMoney.sendMoney)
    .post('/checkBalance' , checkBalance.checkBalance)
    .post('/transactionHistory' , transactionHistory.transactionHistory)
    .post("/success" , successrazorPay.successrazorPay)
    .post("/razorpay", RazorPay.RazorPay);

exports.route = routes;
