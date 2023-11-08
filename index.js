const express = require('express');
const dbConnection = require('./db');
const {PORT} = process.env;

const app = express();


app.listen(PORT, async()=>{
   try {
    await dbConnection;
    console.log("connected to db")
   } catch (error) {
    console.log("Unable to connect to db");
    console.log("err", error.message)
   }

   console.log(`server is running at port ${PORT}`)
})