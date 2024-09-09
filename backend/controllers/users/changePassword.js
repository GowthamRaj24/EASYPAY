const usersSchema = require('../../models/usersSchema');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcrypt');

const changePassword = async (req , res) => {
    try{
        const userData = await usersSchema.findOne({_id : req.body.userId});
        const encrypted_password = await bcrpyt.hash(req.body.newPassword , 10);
        const comparePassword = await bcrpyt.compare(req.body.oldPassword , userData.password);
        console.log(encrypted_password);
        console.log(userData);
        if (!comparePassword){
            res.status(401).send("Entered Password Mismatch");
            return;
        }
        userData.password = `${encrypted_password}`;
        await userData.save();
        res.status(200).send("Password Changed Successfully");
        return;
    }
    catch(err){
        res.status(401).send("Unauthorized");
    }
}

exports.changePassword = changePassword;