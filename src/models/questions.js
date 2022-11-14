const mongoose = require('mongoose');
const questions = new mongoose.Schema({
    answer: String,
    level: Number,
    question: String
});


const question = mongoose.model('questions', questions);
module.exports = question;