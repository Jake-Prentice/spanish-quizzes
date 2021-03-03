import getRandomNextQuestion from "utils/getRandomNextQuestion";

const ACTIONS = {
    SET_USER_ANSWER: "set-user-answer",
    SET_CONJUGATIONS: "set-conjugations",
    SET_CURRENT_CONJUGATION_INDEX: "set-current-conjugation-index",
    LOAD: "load",
    USER_ANSWERED: "user-answered",
    CONFIGURE_NEXT_QUESTION: "configure-next-question",
    RESET_QUIZ: "play-again"
}

export const setUserAnswer = e => ({
    type: ACTIONS.SET_USER_ANSWER,
    payload: e.target.value
})


export const load = (conjugations, numOfQuestions) => ({
    type: ACTIONS.LOAD,
    payload: {
        conjugations,
        numOfQuestions
    }
})


export const userAnswered = (isCorrect) => ({
    type: ACTIONS.USER_ANSWERED,
    payload: isCorrect
})

export const configureNextQuestion = questions => {
    const nextQuestion = getRandomNextQuestion(questions);
    return {
        type: ACTIONS.CONFIGURE_NEXT_QUESTION,
        payload: nextQuestion
    }
}

export const resetQuiz = () => ({
    type: ACTIONS.RESET_QUIZ
})


export default ACTIONS;