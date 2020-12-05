const mongoose = require("mongoose");
const quizConfigSchema = require("./quizConfig");

const quizSchema = {
    title: String,
    configs: [quizConfigSchema],
    verbs: [{verb: String}]
};

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;

