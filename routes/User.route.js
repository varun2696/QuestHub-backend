const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../model/User.model');

const userRouter = express.Router();

userRouter.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 2, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.status(400).send({ "err": err.message })
            }
            else {
                const user = new UserModel({ name, email, password: hash });
                await user.save();
                res.status(200).send({ "msg": "User registered successfully" })
            }
        });
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})

module.exports = {
    userRouter
}