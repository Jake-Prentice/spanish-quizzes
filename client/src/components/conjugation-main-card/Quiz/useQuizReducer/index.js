import React, {useEffect, useReducer} from "react";
import reducer, {initialStates} from "./reducer";
import {useImmerReducer} from "use-immer";


const tryUpdateSessionStorage = ({
    conjugations,
    questionIndex,
    questions,
    questionsDone,
    numOfQuestions,
    numOfCorrectAnswers
  }) => {
    try {
      sessionStorage.setItem("quiz", JSON.stringify({
        conjugations,
        questionIndex,
        questions,
        numOfQuestions,
        questionsDone,
        numOfCorrectAnswers
      }));
    } catch (exception) {}
  }


const useQuizReducer = () => {

    const [state, dispatch] = useImmerReducer(
        reducer,
        {},
        () => {
            let persistedState;
            try {
                persistedState = JSON.parse(sessionStorage.getItem("quiz"));
            } catch (exception) {}

            return { ...initialStates, ...persistedState };
        }
    );

    useEffect(() => {
        tryUpdateSessionStorage(state)
    }, [state])

    return [state, dispatch];
}


export default useQuizReducer;