const express = require('express');
const routes = express.Router();

const checkBalance = require('../controllers/transactions/checkBalance');
const sendMoney = require('../controllers/transactions/sendMoney');
const transactionHistory = require('../controllers/transactions/transactionHistory');

routes
    .post('/sendMoney' , sendMoney.sendMoney)
    .post('/checkBalance' , checkBalance.checkBalance)
    .post('/transactionHistory' , transactionHistory.transactionHistory);

exports.route = routes;
