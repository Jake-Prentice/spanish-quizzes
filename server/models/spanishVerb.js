const mongoose = require("mongoose");

const spanishVerbSchema = new mongoose.Schema({
    verb: String,
    moods: [
        {
            mood: String,
            allTenses: Array,
            conjugations: [{type: Object}]
        }
    ]
});

const SpanishVerb = mongoose.model("SpanishVerb", spanishVerbSchema);
module.exports = SpanishVerb;