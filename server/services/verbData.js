const spanishDict = require("../helpers/spanishDict");
const VerbData = require("../models/verbData");
const {ErrorHandler} = require("../helpers/error");

const addVerb = async (verb) => {
 
    try {
        
        const verbData = await spanishDict.getVerbData(verb);

        const newVerb = new VerbData({
            verb,
            translation: verbData.translation
        });

        const allconjugations = [];

        for (let paradigm in verbData.conjugations) {
            allconjugations.push(...verbData.conjugations[paradigm].filter(form => 
                form.pronoun !== "vos" && form.word !== "-"
            ))        
        }

        const schemaStructure = VerbData.schema.obj;

        let nextConjugationIndex = 0;

        for (let mood in schemaStructure.paradigms) {
            for (let tense in schemaStructure.paradigms[mood]) {
                for (let pronoun in schemaStructure.paradigms[mood][tense]) {
                    newVerb.paradigms[mood][tense][pronoun] = allconjugations[nextConjugationIndex].word;
                    nextConjugationIndex++;
                }
            }
        }

        await newVerb.save();
       
    }catch(err) {throw new ErrorHandler(500, err.message)}

}

module.exports = {
    addVerb
}