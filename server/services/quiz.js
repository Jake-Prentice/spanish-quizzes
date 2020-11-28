const Quiz = require("../models/quiz");

const addVerbToQuiz = async ({quizId, verb}) => {
    try{
        await Quiz.findOneAndUpdate(
            {_id: quizId}, {$push: {verbs: {verb} }}
        )  
    }catch(err) {throw new Error(err)}
}

const createConfig = () => { 
    
}

module.exports = {
    addVerbToQuiz
};