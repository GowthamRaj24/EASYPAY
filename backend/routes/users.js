const express = require('express');
const routes = express.Router();

const loginUser = require('../controllers/users/loginUser');
const signupUser = require('../controllers/users/signupUser');
const sendOTP = require('../controllers/users/sendOTP');
const checkOTP = require('../controllers/users/checkOTP');
const userData  = require('../controllers/users/userData');
const changePassword  = require('../controllers/users/changePassword');
const addUser = require('../controllers/users/addUser');
const getUserById = require('../controllers/users/getuserById');

routes
    .post('/loginUser' , loginUser.loginUser)
    .post('/signupUser' , signupUser.signupUser)
    .post('/sendOTP' , sendOTP.sendOTP)
    .post('/checkOTP' , checkOTP.checkOTP)
    .post('/userData' , userData.userData)
    .post('/addUser' , addUser.addUser)
    .post('/getuserById' , getUserById.getUserById)
    .post('/changePassword' , changePassword.changePassword);


exports.route = routes;