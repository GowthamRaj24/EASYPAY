const usersSchema = require("../../models/usersSchema");

const transactionHistory = async (req , res) => {
    try{
        const userData = await usersSchema.findById(req.body.userId);
        res.status(200).json(userData.transactions);
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.transactionHistory = transactionHistory;