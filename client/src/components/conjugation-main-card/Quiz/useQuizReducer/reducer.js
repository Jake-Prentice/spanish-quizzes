import ACTIONS from "./actions";


export const initialStates = {
    conjugations: undefined,
    questionIndex: 0,
    numOfCorrectAnswers: 0,
    numOfQuestions: null,
    questionsDone: 0,
    userAnswer: "",
    userAnswered: false,
    isCorrect: false,
    error: ""
}


const reducer = (draft, action) => { 
    const initialWeightValue = 10;
    switch(action.type) {

        case ACTIONS.SET_USER_ANSWER:
            draft.userAnswer = action.payload
            return;

        case ACTIONS.LOAD:
            draft.numOfQuestions = action.payload.numOfQuestions
            draft.conjugations = action.payload.conjugations.map(conjugation => (
                {...conjugation, weight: initialWeightValue}    
            ))
            return;

        case ACTIONS.USER_ANSWERED:
            draft.userAnswered = true
            draft.isCorrect = action.payload;
            if (draft.isCorrect) draft.numOfCorrectAnswers += 1;
            return;

        case ACTIONS.CONFIGURE_NEXT_QUESTION:
            const weightSensitivity = 10;

            draft.userAnswer = initialStates.userAnswer;
            draft.userAnswered = initialStates.userAnswered;
            
            if (draft.isCorrect) {
                draft.conjugations = draft.conjugations.map((conjugation, index) => {
                    return {
                        ...conjugation, 
                        weight: index === draft.questionIndex 
                            ? conjugation.weight 
                            : conjugation.weight * 50
                    }
                })
                
            }else {
                const currentQuestion = draft.conjugations[draft.questionIndex];
                currentQuestion.weight =  currentQuestion.weight * 50 ;
            }

            draft.questionIndex = action.payload;
            draft.questionsDone += 1;
            return;
        case ACTIONS.RESET_QUIZ:
            draft.questionIndex = initialStates.questionIndex;
            draft.numOfCorrectAnswers = initialStates.numOfCorrectAnswers;
            draft.questionsDone = initialStates.questionsDone;
            draft.conjugations = draft.conjugations.map(conjugation => (
                {...conjugation, weight: initialWeightValue})
            )
            return;
    }
}

export default reducer;