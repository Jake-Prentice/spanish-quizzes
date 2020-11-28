const mongoose = require("mongoose");

const quizSchema = {
    title: String,
    configs: [],
    verbs: [{verb: String}]
};

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;