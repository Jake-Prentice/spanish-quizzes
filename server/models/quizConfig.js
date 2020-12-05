const mongoose = require("mongoose");

const quizConfigSchema = {
    filterOptions: { 
        moods: [
            {mood: {type: String, required: true}, tenses: [{
                tense: {type: String, required: true}, forms: []
            }]}
        ]
    }
};

module.exports = quizConfigSchema