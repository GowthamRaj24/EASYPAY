const mongoose = require('mongoose');
const url = "mongodb+srv://mgowthamraj9491:TZSjyosXhcYTQQKR@cluster0.fajap.mongodb.net/Paytm";


const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to the database');
    } catch (err) {
        console.log('Error connecting to the database', err);
    }
};

exports.connect = connect;