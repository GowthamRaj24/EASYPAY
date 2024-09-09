const usersSchema = require("../../models/usersSchema");
const jwt = require('jsonwebtoken');
const walletSchema = require("../../models/walletSchema");

const checkOTP = async (req, res) => {
    try{
        if(req.body.otp == req.body.userOTP){
            res.status(200).json({msg : "OTP Verified"});
            return;
        }
        else{
            res.status(401).json({msg : "Invalid OTP"});
            return;
        }
    }
    catch(err){
        res.status(500).send(err);
        return;
    }
}

exports.checkOTP = checkOTP;