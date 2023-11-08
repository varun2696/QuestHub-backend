const express = require('express');
const dbConnection = require('./db');
const { userRouter } = require('./routes/User.route');
const { PORT } = process.env;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is Working")
})

app.use('/users', userRouter)

app.listen(PORT, async () => {
    try {
        await dbConnection;
        console.log("connected to db")
    } catch (error) {
        console.log("Unable to connect to db");
        console.log("err", error.message)
    }

    console.log(`server is running at port ${PORT}`)
})