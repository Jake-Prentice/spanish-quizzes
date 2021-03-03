import React, {useEffect, useState} from "react";
import {useLocation, Redirect} from "react-router-dom";
import {
    CheckButton,
    QuestionInput,
    InputWrapper,
    Form,
    ProgressBarWrapper,
    QuizWrapper,
    CoolCircleThing
} from "./style";
import useQuizReducer from "./useQuizReducer";
import {
    load,
    setUserAnswer,
    userAnswered,
    configureNextQuestion
} from "./useQuizReducer/actions"
import {Margin} from "components/shared/spacing";
import ScoreCard from "./ScoreCard";
import {motion} from "framer-motion";
import ProgressBar from "./ProgressBar";

const QuizPage = () => {

    const {state} = useLocation();

    const [quiz, dispatch] = useQuizReducer();

    const question = quiz?.conjugations?.[quiz.questionIndex];

    useEffect(() => {
        if (!quiz.conjugations) dispatch(load(state.conjugations, state.numOfQuestions))
    }, [quiz.conjugations])

    const checkAnswer = () => {
        const userAnswer = quiz.userAnswer.replace(/\s+/g, "");
        const correctAnswer = question.conjugation.replace(/\s+/g, "");

        const isCorrect = userAnswer === correctAnswer;

        dispatch(userAnswered(isCorrect));
    }


    
    if (!state.conjugations) return <Redirect to="." /> 

    if (quiz.numOfQuestions === quiz.questionsDone) return (
        <ScoreCard  
            numOfQuestions={quiz.numOfQuestions}
            numOfCorrectAnswers={quiz.numOfCorrectAnswers}
            dispatch={dispatch}
        />
    )
    
    const variants = {
        correct: {
            borderColor: "green"
        },
        incorrect: {
            borderColor: "red"
        }
    } 

    return (
        <>
        <ProgressBarWrapper>
            <div style={{zIndex: 0}}>
                <ProgressBar 
                    current={quiz.questionsDone + 1}
                    total={quiz.numOfQuestions}
                />
                 <Margin bottom={"20px"} />
            </div>
           
        </ProgressBarWrapper>
        
        <QuizWrapper>
            {question && (    
                <Form
                    variants={variants} 
                    onSubmit={e => {
                        e.preventDefault();
                        quiz.userAnswered ? dispatch(configureNextQuestion(quiz.conjugations)) : checkAnswer();
                    }
                }>
                    <h3>{question.mood} - {question.tense}</h3>
    
                    <InputWrapper>
                        <h4>{question.pronoun}</h4>
                        <QuestionInput 
                            value={quiz.userAnswer} 
                            onChange={e => dispatch(setUserAnswer(e))}     
                        />    
                        <h4>( {question.infinitive} )</h4>
                    </InputWrapper>
                    {quiz.userAnswered && !quiz.isCorrect && (
                        <motion.h4
                            style={{color: "#d25656"}}
                            animate={{y: 2}}
                        >
                            {question.conjugation}
                        </motion.h4>
                    )}
                    {/* <Margin bottom={"30px"} /> */}
                    <CheckButton
                        userAnswered={quiz.userAnswered}
                        isCorrect={quiz.isCorrect}
                    >
                        {quiz.userAnswered 
                            ? quiz.isCorrect 
                                ? "Correct" 
                                : "Incorrect" 
                            : "Check"
                        }
                    </CheckButton>
                </Form>
            )}
            </QuizWrapper>
        </>
    )
}

export default QuizPage; 