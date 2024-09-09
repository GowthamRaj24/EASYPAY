const mongoose = require("mongoose");
const walletSchema = require("../../models/walletSchema");
const usersSchema = require("../../models/usersSchema");

const sendMoney = async(req , res) => {
    try{
        const session = await mongoose.startSession();

        session.startTransaction();

        const fromUserID = req.body.fromUserID;
        const toUserID = req.body.toUserID;
        const amount = req.body.amount;

        const fromUserWallet = await walletSchema.findOne({userId : fromUserID}).session(session);
        const toUserWallet = await walletSchema.findOne({userId : toUserID}).session(session);

        if ( fromUserWallet.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({msg : "Insufficient Amount"});
        }

        if (!toUserWallet || !fromUserWallet){
            await session.abortTransaction();
            return res.status(400).json({msg : "Invalid User ID"});
        }

        await walletSchema.findOneAndUpdate({userId : fromUserID} , { $inc : {balance : -amount}});
        await walletSchema.findOneAndUpdate({userId : toUserID} , {$inc : {balance : amount}});

        await usersSchema.findByIdAndUpdate(fromUserID , { $push : {transactions : {amount : -amount , to : toUserID , from : fromUserID , status : "Sent"}}});
        await usersSchema.findByIdAndUpdate(toUserID , { $push : {transactions : {amount : amount , from : fromUserID , to : toUserID , status : "Received"}}});

        await session.commitTransaction();
        await session.endSession();
        
        return res.status(200).json({msg : "Transaction Successfull"});
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.sendMoney = sendMoney;