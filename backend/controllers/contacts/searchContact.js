const usersSchema = require("../../models/usersSchema");
const searchContact = async (req, res) => {
    const filter = req.body.filter || "";
    const users = await usersSchema.find({
        $or: [{
            username : {
                "$regex": filter
            }
        },
            {
            firstName: {
                "$regex": filter
            }
            },
            {
            lastName: {
                "$regex": filter
            }
            }
        ]
    });
    res.status(200).json({ list: users });
};

exports.searchContact = searchContact;