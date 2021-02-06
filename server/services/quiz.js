const {ErrorHandler} = require("../helpers/error");
const Quiz = require("../models/quiz");
const VerbData = require("../models/verbData");

const addVerbToQuiz = async ({quizId, verb}) => {
    try{
        await Quiz.findOneAndUpdate(
            {_id: quizId}, {$push: {verbs: {verb} }}
        )  
    }catch(err) {throw new Error(err)}
}

const configureQuizConfig = (quizConfig, verb) => {

    const stack = [verb.paradigms];
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
    try {
        const foundQuiz = await Quiz.findOne({"configs._id": id}).select("configs.$ verbs");
        const quizVerbs = [];
    
        const verbs = await VerbData.find({ verb: {
            $in: foundQuiz.verbs.map( ({verb}) => verb )
        }})
        
        verbs.forEach(verb => {
            quizVerbs.push(...configureQuizConfig(foundQuiz.configs[0].toObject(), verb.toObject()));
        })

        return quizVerbs;

    }catch(err) {throw new ErrorHandler(500, err.message)}

}


module.exports = {
    addVerbToQuiz,
    configureQuizConfig,
    configureQuizByConfigId
};