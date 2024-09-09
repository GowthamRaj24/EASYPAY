const usersSchema = require("../../models/usersSchema");
const deleteContact = async (req , res) => {
    try{
        const contactId = req.body.contactId;
        const userId = req.body.userId;
        const user = await usersSchema.findById(userId);
        if (user.contacts.includes(contactId)){
            user.contacts.remove(contactId);
            res.status(200).json({msg:"Contact Removed Successfully"});
        }
        else{
            res.status(400).json({msg : "User Does Not exits in you contacts"});
        }
    }
    catch(err){
        res.status(500).json("Can't Delete USer" + err);
    }
}

exports.deleteContact = deleteContact;