const {ErrorHandler} = require("../helpers/error");
const Quiz = require("../models/quiz");
const VerbData = require("../models/verbData");

const states = {
    "mood" : {next: "tenses"},
    "tense" : {next: "pronouns"},
    "pronoun" : {next: null}
}

const configureQuizConfig = async (config, verb) => {

    const foundVerb = await VerbData.findOne({verb: verb})
    const filteredVerbs = [];

    const traverseTree = (obj) => {
        for (let value in obj) {
            if (typeof obj[value] === "object") traverseTree(obj[value])
            else filteredVerbs.push(obj[value])
        }
    }

    const recurse = (config, verbData) => {
        let currentParadigm = verbData;

        for (let value in config) {
            if (typeof config[value] === "object") {
                recurse(config[value], currentParadigm)
            }else {
                if (!states.hasOwnProperty(value)) continue;
                currentParadigm = currentParadigm[config[value]];
                const nextParadigms = states[value].next;
                // if next exists and state is supposed to have a next but doesn't
                if (nextParadigms) {
                    if (!config[nextParadigms]) traverseTree(currentParadigm)            
                }else filteredVerbs.push(currentParadigm);      
            }
        }
    }

    recurse(
        config.filterOptions, 
        foundVerb.paradigms.toObject()
    );

    return filteredVerbs;
}


const configureQuizByConfigId = async (id) => {
    const foundQuiz = await Quiz.findOne({"configs._id": id}).select("configs.$ verbs");
    const quizVerbs = [];
    
    console.log(foundQuiz.configs[0].filterOptions.moods)
    for (const {verb} of foundQuiz.verbs) {
        quizVerbs.push(...await configureQuizConfig(foundQuiz.configs[0].toObject(), verb ))
    }

    return quizVerbs;
}


module.exports = {
    configureQuizConfig,
    configureQuizByConfigId
};