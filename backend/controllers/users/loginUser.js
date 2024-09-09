const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersSchema = require("../../models/usersSchema");

const loginUser =async (req , res) => {
    try{
        const userData = await usersSchema.findOne({username : req.body.username});
        if(!userData){
            res.status(400).send("User not found");
            return;
        }
        const isValid = await bcrypt.compare(req.body.password , userData.password);
        if(!isValid){
            res.status(400).send("Invalid Password");
            return;
        }
        const token = jwt.sign({userId : userData._id} , "mysecretkey");
        res.status(200).send({token : token});
        
        return;
    }
    catch(err){
        res.status(500).send("Internal Server Error" + err);
        return;
    }
}
exports.loginUser = loginUser;