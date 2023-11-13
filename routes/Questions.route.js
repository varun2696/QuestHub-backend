const express = require('express');
const { QuestionModel } = require('../model/Question.model');

const questionsRouter = express.Router();


// Route for getting all questions
questionsRouter.get('/', async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        if(questions){
            res.status(200).send(questions);
        }
        else{
            res.status(200).send({msg: "404 Questions not found"})
        }
    }
    catch (error) {
        res.status(400).send({ err: error.message })
    }
})


module.exports = {
    questionsRouter
}