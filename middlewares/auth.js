const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'questHub123');
            if (decoded) {
                req.body.username = decoded.username;
                req.body.userId = decoded.userId;
                next();
            }
            else {
                res.status(200).send({ 'msg': "You are not authorised user" })
            }
        } catch (error) {
            res.status(400).send({ "err": error.message })
        }

    }
    else {
        res.send({ msg: "Please Login" })
    }
}


module.exports = auth;