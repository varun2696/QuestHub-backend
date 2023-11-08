const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, required: true }
}, {
    versionKey: false
})

const UserModel = mongoose.model('user', userSchema);


module.exports = UserModel;