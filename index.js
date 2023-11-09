const express = require('express');
const dbConnection = require('./db');
const { userRouter } = require('./routes/User.route');
const auth = require('./middlewares/auth');
const { QnARouter } = require('./routes/QnA.route');
const { PORT } = process.env;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ msg: "Server is Working. Provide end points to get related data" })
})

app.use('/users', userRouter)


// proteced routes 
app.use(auth);

app.use("/questions", QnARouter)

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