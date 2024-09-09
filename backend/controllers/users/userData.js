const usersSchema = require('../../models/usersSchema');
const jwt = require('jsonwebtoken');

const userData = async (req, res) => {
    try {
        const decrypted = jwt.verify(req.body.token, "mysecretkey");
        console.log(decrypted);
        const userData = await usersSchema.findOne({_id: decrypted.userId});
        console.log(userData);
        res.status(200).send(userData);
        return;
    } catch {
        res.status(401).send("Unauthorized");
        return;
    }
}

exports.userData = userData;