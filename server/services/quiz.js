const {ErrorHandler} = require("../helpers/error");
const Quiz = require("../models/quiz");
const VerbData = require("../models/verbData");

const states = {
    "mood" : {next: "tenses"},
    "tense" : {next: "pronouns"},
    "pronoun" : {next: null}
}

const configureQuizConfig = async (filterOptions, verb) => {

    const foundVerb = await VerbData.findOne({verb: verb})
    const filteredVerbs = [];

    const paradigms = {}

    const traverseTree = (obj, index) => {
        let nextIndex = index + 1;
        for (let value in obj) {
            paradigms[Object.keys(states)[nextIndex]] = value;
            if (typeof obj[value] === "object") {
                traverseTree(obj[value], nextIndex)
            }else {
                paradigms["conjugation"] = obj[value];
                filteredVerbs.push({...paradigms})
            }
        }
    }

   
    const recurse = (fitlerOptionsRef, verbData) => {
        let currentParadigm = verbData;

        for (let value in fitlerOptionsRef) {
            if (typeof fitlerOptionsRef[value] === "object") {
                recurse(fitlerOptionsRef[value], currentParadigm)

            }else if (states.hasOwnProperty(value)){
                paradigms[value] = fitlerOptionsRef[value]
                currentParadigm = currentParadigm[fitlerOptionsRef[value]];
                const nextParadigms = states[value].next;
                // if next exists and state is supposed to have a next but doesn't
                if (nextParadigms) {
                    if (!fitlerOptionsRef[nextParadigms]) {
                        traverseTree(
                            currentParadigm, 
                            Object.keys(states).findIndex(state => state === value)
                        ) 
                    }           
                }else {
                    paradigms["conjugation"] = currentParadigm;
                    filteredVerbs.push({...paradigms}); 
                }     
            }
        }
    }

    recurse(
        filterOptions, 
        foundVerb.paradigms.toObject()
    );

    return filteredVerbs;
}


const configureQuizByConfigId = async (id) => {
    const foundQuiz = await Quiz.findOne({"configs._id": id}).select("configs.$ verbs");
    const quizVerbs = [];
    
    for (const {verb} of foundQuiz.verbs) {
        quizVerbs.push(...await configureQuizConfig(
            foundQuiz.configs[0].filterOptions.toObject(), 
            verb 
        ))
    }

    return quizVerbs;
}


module.exports = {
    configureQuizConfig,
    configureQuizByConfigId
};