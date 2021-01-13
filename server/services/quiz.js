const {ErrorHandler} = require("../helpers/error");
const Quiz = require("../models/quiz");
const SpanishVerb = require("../models/spanishVerb");

const addVerbToQuiz = async ({quizId, verb}) => {
    try{
        await Quiz.findOneAndUpdate(
            {_id: quizId}, {$push: {verbs: {verb} }}
        )  
    }catch(err) {throw new Error(err)}
}


const addConfigToQuiz = async (quizId, config) => {


}


const configureQuizConfig = (quizConfig, verb) => {

    const verbForms = [];

    if (quizConfig.filterOptions.moods) {
        quizConfig.filterOptions.moods.forEach(currentMood => {
            const verbMood = verb.moods.find(({mood}) => mood === currentMood.name); 
            // verbMood = verb.moods[mood]
            if (currentMood.tenses) {
                currentMood.tenses.forEach(tense => {
                    const meta = {mood: currentMood.name, tense: tense.name}
                    
                    if (tense.pronouns) { //are pronoun options
                        tense.pronouns.forEach(pronoun => {
                            pronounConjugations = verbMood.conjugations.find(conjugations => conjugations.person === pronoun);  
                            verbForms.push({
                                verbForm: pronounConjugations[tense.name], 
                                meta: {
                                    ...meta, 
                                    pronoun
                                }
                            })
                        })
                    }else { //no pronoun options

                       verbMood.conjugations.forEach(conjugation => { 
                            verbForms.push({
                                verbForm: conjugation[tense.name], 
                                meta: { 
                                    ...meta, 
                                    pronoun: conjugation.person
                                }
                            })
                        })
                    }
                });

            }else {
                verbMood.conjugations.forEach(conjugation => {
                    for (let tense in conjugation) {
                        verbForms.push({
                            verbForm: conjugation[tense],
                            meta: {
                                mood: currentMood.name,
                                tense,
                                pronoun: conjugation.person
                            }
                        })
                    }
                })
            }
        })

    }else {
        verb.moods.forEach(mood => {
            mood.conjugations.forEach(conjugation => {
                for (let tense in conjugation) {
                    verbForms.push({
                        verbForm: conjugation[tense],
                        meta: {
                            mood: mood.mood,
                            tense,
                            pronoun: conjugation.person
                        }
                    })
                }
            })
        })
    }
  
    return verbForms;
}

const configureQuizByConfigId = async (id) => {
    try {
        const foundQuiz = await Quiz.findOne({"configs._id": id}).select("configs.$ verbs");
        const quizVerbs = [];
    
        const verbs = await SpanishVerb.find({ verb: {
            $in: foundQuiz.verbs.map( ({verb}) => verb )
        }})
        
        verbs.forEach(verb => {
            quizVerbs.push(...configureQuizConfig(foundQuiz.configs[0], verb));
        })
    
        return quizVerbs;

    }catch(err) {throw new ErrorHandler(500, err.message)}

}


module.exports = {
    addVerbToQuiz,
    addConfigToQuiz,
    configureQuizConfig,
    configureQuizByConfigId
};