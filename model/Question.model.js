const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    username: String,
    userId: String,
    answerText: String,
    postedDate: Date,
},
    {
        versionKey: false
    });

const questionSchema = new mongoose.Schema({
    username: String,
    userId: String,
    questionTitle: String,
    questionDescription: String,
    language: String,
    upvotes: Number,
    answers: [answerSchema],   // Embedded array of answers
    postedDate: Date,
}, {
    versionKey: false
});

const QuestionModel = mongoose.model('QnA', questionSchema);


module.exports = { QuestionModel };



