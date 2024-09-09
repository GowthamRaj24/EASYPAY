const walletSchema = require("../../models/walletSchema");

const checkBalance = async (req , res) => {
    try{
        const userId = req.body.userId;
        const user = await walletSchema.findOne({userId : userId});
        console.log()
        res.status(200).json({balance : user.balance});
    }
    catch(err){
        res.status(500).json("Internal Server Err" + err)
    }
}

exports.checkBalance = checkBalance;