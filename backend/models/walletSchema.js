const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {type:Number , required : true , default : Math.floor(Math.random() * 1000)}
});

module.exports = mongoose.model('Wallet', walletSchema);