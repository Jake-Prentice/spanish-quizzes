import React, {useEffect} from "react";
import {
    QuestionInput
} from "./style";


const QuizPage = () => {
    useEffect(() => {
        console.log("quiz page init");
    },[])
    return (
        <>
            <QuestionInput />
        </>
    )
}

export default QuizPage