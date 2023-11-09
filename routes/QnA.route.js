const express = require('express');
const { QuestionModel } = require('../model/Question.model');


const QnARouter = express.Router();


// Route for posting a new question
QnARouter.post('/create', async (req, res) => {
    const { username, userId, questionTitle, questionDescription, language } = req.body;

    try {
        const newQuestion = new QuestionModel({
            username,
            userId,
            questionTitle,
            questionDescription,
            language,
            upvotes: 0,
            answers: [],
            postedDate: Date.now()
        });

        await newQuestion.save();
        res.status(200).send({ "msg": "Question posted successfully!!" })
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
})



// Route for getting all questions
QnARouter.get('/', async (req, res) => {
    try {
        // const questions = await QuestionModel.find({ userId: req.body.userId });
        const questions = await QuestionModel.find();
        res.status(200).send(questions);
    }
    catch (error) {
        res.status(400).send({ err: error.message })
    }
})



// Route for getting a specific question by id
QnARouter.get('/:questionId', async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await QuestionModel.findById({ _id: questionId });
        if (question) {
            res.status(200).send(question);
        }
        else {
            res.status(200).send({ msg: "Question Not found" })
        }
    }
    catch (error) {
        res.status(400).send({ 'err': error.message })
    }
})



// Route for update the specific question by id
QnARouter.patch('/update/:questionId', async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await QuestionModel.findOne({ _id: questionId });
        if (req.body.userId !== question.userId) {
            res.status(200).send({ "msg": "You are not authorised" })
        }
        else {
            await QuestionModel.findByIdAndUpdate({ _id: questionId }, req.body);
            res.status(200).send({ 'msg': "You are edited the question" })
        }
    }
    catch (error) {
        res.status(400).send({ 'err': error.message })
    }
})



// Route for delete the specific question by id
QnARouter.delete('/delete/:questionId', async (req, res) => {
    const { questionId } = req.params;

    try {
        const question = await QuestionModel.findOne({ _id: questionId });
        if (req.body.userId !== question.userId) {
            res.status(200).send({ "msg": "You are not authorised" })
        }
        else {
            await QuestionModel.findByIdAndDelete({ _id: questionId });
            res.status(200).send({ 'msg': "You are deleted the question" })
        }
    }
    catch (error) {
        res.status(400).send({ 'err': error.message })
    }
})



// Route for posting answers to a specific question
QnARouter.post('/:questionId/answers', async (req, res) => {
    const { questionId } = req.params;
    const { username, userId, answerText } = req.body;

    try {
        const question = await QuestionModel.findById({ _id: questionId });
        if (userId === question.userId) {
            res.status(200).send({ msg: "You only posted this question." })
        }
        else {
            const newAnswer = {
                username,
                userId,
                answerText,
                postedDate: new Date()
            }

            question.answers.push(newAnswer);
            await question.save();
            res.status(200).send({ msg: "Your answer is posted" });
        }
    }
    catch (error) {
        res.status(400).send({ 'err': error.message })
    }
})


module.exports = {
    QnARouter
}





// let obj = {
//     "questionTitle": "what is Node.js",
//     "questionDescription": "Explain in terms of backend and how we use node.js as backend server",
//     "language": "Node.js"
// }
