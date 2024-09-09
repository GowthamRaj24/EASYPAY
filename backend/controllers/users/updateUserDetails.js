const usersSchema = require("../../models/usersSchema");

const updateUserDetails = async (req, res) => {
    try{
        const userData = await usersSchema.findOne({_id : req.body.userId});
        userData.firstName = req.body.firstName;
        userData.lastName = req.body.lastName;
        await userData.save();
        res.status(200).send("User Details Updated Successfully");
    }
    catch(err){
        res.status(401).send(err);
    }
}

exports.updateUserDetails = updateUserDetails;