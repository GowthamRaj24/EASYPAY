const nodeMailer = require('nodemailer');
const {transporter} = require('../../apis/transporter');

const sendOTP = async (req, res) => {
    try{
        const otp = Math.floor(100000 + Math.random() * 900000);
    try{
        const info = await transporter.sendMail({
            from: 'mgowthamraj9491@gmail.com',
            to: `${req.body.username}`, 
            subject: "OTP for Verification - EASY_PAY", 
            html: `<b>OTP : ${otp}</b>`
        });
        console.log("OTP Sent");
        res.status(200).json({ otp : otp , msg : "OTP Sent" });
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).send("Can't Send OTP");
        }
    }

    catch(err){
        res.status(500).send("Error in sending the OTP " + err);
        return;
    }
}

exports.sendOTP = sendOTP;