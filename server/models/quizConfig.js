const mongoose = require("mongoose");

const quizConfigSchema = {
    mood: {type: String, required: true},
    paradigms: [
        {
            paradigm: {
                type: String, 
                required: true
            }, 
            pronouns: {type: Array}
        }
    ]
};

module.exports = mongoose.model("QuizConfig", quizConfigSchema);