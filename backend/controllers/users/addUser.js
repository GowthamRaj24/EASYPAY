const usersSchema = require("../../models/usersSchema");
const walletSchema = require("../../models/walletSchema");

const addUser = async (req, res) => {
    try{

        const existingUser = await usersSchema.findOne({ username: req.body.username });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).send("User with this Username already exists");
        }
        console.log("User does not exist");
        const user = await usersSchema.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.username,
            password : req.body.password
        });

        await user.save();
        console.log("User Created");

        const wallet = await walletSchema.create({userId : user._id});
        await wallet.save();

        res.status(200).send();
    }
    catch(err){
        res.status(500).send("error in adding user\n" + err);
    }
}

exports.addUser = addUser;