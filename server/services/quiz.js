const {ErrorHandler} = require("../helpers/error");
const quiz = require("../models/quiz");
const Quiz = require("../models/quiz");
const VerbData = require("../models/verbData");


const configureQuizConfig = async (quizConfig, verb) => {

    const foundVerb = await VerbData.findOne({verb: verb})
    

    const stack = [foundVerb.toObject().paradigms];
    const words = [];
    
    const traverseTree = (obj) => {
        for (let value in obj) {
            if (typeof obj[value] === "object") traverseTree(obj[value])
            else {
               words.push(obj[value])
            }
        }
    }

    const traverseConfig = (obj) => {
            for (let value in obj) {
                
                if (typeof obj[value] === "object") traverseConfig(obj[value])
                else {
                    const next = stack[stack.length - 1][obj[value]]
                    
                    if (value === "mood" && !obj.tenses) traverseTree(next);
                    else if (value === "tense" && !obj.pronouns) traverseTree(next);
                    
                    else {
                        if (typeof next === "object") stack.push(next);
                        else words.push(next);
                    }
                }
            }
          
            if (typeof obj === "object" && obj.length !== undefined) stack.pop(); // the only way I could think of telling apart an array from an object
            
    }

    traverseConfig(quizConfig.filterOptions);
    
    return words;
  
}

const configureQuizByConfigId = async (id) => {
    const foundQuiz = await Quiz.findOne({"configs._id": id}).select("configs.$ verbs");
    const quizVerbs = [];
    
    for (const {verb} of foundQuiz.verbs) {
        quizVerbs.push(...await configureQuizConfig(foundQuiz.configs[0].toObject(), verb ))
    }

    return quizVerbs;
}


module.exports = {
    configureQuizConfig,
    configureQuizByConfigId
};