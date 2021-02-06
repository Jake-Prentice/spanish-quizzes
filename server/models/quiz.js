const mongoose = require("mongoose");

const quizConfigSchema = {
    filterOptions: { 
        moods: [
            {
                mood: String, 
                _id: false,
                tenses: { 
                    type: [{
                        tense: String, 
                        _id: false,
                        pronouns: {
                            type: [{pronoun: String, _id: false}],
                            default: undefined
                        }
                    }],
                    default: undefined
                }
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


