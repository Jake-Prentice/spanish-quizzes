const mongoose = require("mongoose");

const quizConfigSchema = {
    saveNum: {type: Number, required: true},
    filterOptions: { 
        moods: [
            {
                name: {type: String, required: true}, 
                tenses: [{
                    name: {type: String, required: true}, 
                    pronouns: [{type: String}]
                }]
            }
        ]
    }
};

const quizSchema = {
    title: String,
    configs: [quizConfigSchema],
    verbs: [{verb: String}]
};

module.exports = mongoose.model("Quiz", quizSchema);

