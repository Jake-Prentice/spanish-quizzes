const mongoose = require("mongoose");

const spanishVerbSchema = {
    verb: {type: String, unique: true, required: true},
    translation: {type: String, required: true},
    phrases: Array,
    paradigms: {
        "indicative": {
            "present": {},
            "preterite": {},
            "imperfect": {},
            "conditional": {},
            "future": {}
        },
        "subjunctive": {
            "present": {},
            "imperfect": {},
            "imperfect-2": {},
            "future": {}
        },
        "imperative": {
            "affirmative": {
                "tú": {type: String, required: true},
                "él/ella/Ud": {type: String, required: true},
                "nosotros": {type: String, required: true},
                "vosotros": {type: String, required: true},
                "ellos/ellas/Uds": {type: String, required: true}
            },
            "negative": {
                "tú": {type: String, required: true},
                "él/ella/Ud": {type: String, required: true},
                "nosotros": {type: String, required: true},
                "vosotros": {type: String, required: true},
                "ellos/ellas/Uds": {type: String, required: true}
            }
        },
        "continuous-progressive": {
            "present": {},
            "preterite": {},
            "imperfect": {},
            "conditional": {},
            "future": {}
        },
        "perfect": {
            "present": {},
            "preterite": {},
            "imperfect": {},
            "conditional": {},
            "future": {}
        },
        "perfect-subjunctive": {
            "present": {}, 
            "past": {},
            "future": {}
        }
    }
}

for (let mood in spanishVerbSchema.paradigms) {
    for (let tense in spanishVerbSchema.paradigms[mood]) {
         if (mood !== "participles" && mood !== "imperative") {
            spanishVerbSchema.paradigms[mood][tense] = {
                "yo": {type: String, required: true},
                "tú": {type: String, required: true},
                "él/ella/Ud": {type: String, required: true},
                "nosotros": {type: String, required: true},
                "vosotros": {type: String, required: true},
                "ellos/ellas/Uds": {type: String, required: true}
            }
        }
    }
}

// console.log(spanishVerbSchema);

const SpanishVerb = mongoose.model("SpanishVerb", new mongoose.Schema(spanishVerbSchema));

module.exports = SpanishVerb;