const usersSchema = require("../../models/usersSchema");

const getUserById = async (req, res) => {
    try {
        const user = await usersSchema.findById(req.body.userId);
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getUserById = getUserById;