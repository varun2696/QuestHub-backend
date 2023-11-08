const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = mongoose.connect(process.env.dataBaseUrl);

module.exports = dbConnection;