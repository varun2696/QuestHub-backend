const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../model/User.model');
const jwt = require('jsonwebtoken');


const userRouter = express.Router();


// signup route
userRouter.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            res.status(200).send({ "msg": "User already exists" })
        }
        else {
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
        }

    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})



// login route
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                // result == true
                if (result) {
                    const generatedToken = jwt.sign({
                        username: user.name,
                        userId: user._id
                    }, 'questHub123', { expiresIn: '1h' });

                    res.status(200).send({ msg: "Login Successful !!", token: generatedToken })
                }
                else {
                    res.status(200).send({ msg: "Wrong credentials" })
                }
            });
        }
        else {
            res.status(200).send({ msg: "Wrong credentials" })
        }
    } catch (error) {
        res.status(400).send({ 'err': error.message })
    }

})


module.exports = {
    userRouter
}