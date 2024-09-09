const usersSchema = require("../../models/usersSchema");

const addContact = async (req , res) =>{
    
    const contactId = req.body.contactId;
    const userId = req.body.userId;
    try{
        const user = await usersSchema.findById(userId);
        if(user.contacts.includes(contactId)){
            res.status(400).json({msg : "Contact already exists"});
            return;
        }
        user.contacts.push(contactId);
        await user.save();
        res.status(200).json({msg : "Contact added successfully"});
        return;
    }
    catch(err){
        res.status(500).send("Error Adding User " + err);
        return;
    }
}

exports.addContact = addContact;