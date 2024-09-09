const usersSchema = require("../../models/usersSchema");
const getAllUsers = async(req , res) => {
    try{
    const data = await usersSchema.find();
    res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.getAllUsers = getAllUsers;