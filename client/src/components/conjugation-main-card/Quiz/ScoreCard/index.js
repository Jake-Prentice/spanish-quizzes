import React from 'react'
import {
    Container,
    RestartButton,
    ExitButton,
    ButtonContainer
} from "./style";
import {Margin} from "components/shared/spacing";
import {resetQuiz} from "../useQuizReducer/actions";

function ScoreCard(props) {
    const {numOfCorrectAnswers, numOfQuestions, dispatch} = props;
    return (
        <Container
            x={"-100px"}
            animate={{x: 0}}
    
        >
            <h1>You scored: {numOfCorrectAnswers} / {numOfQuestions} </h1>
            <Margin bottom={"70px"} />
            <ButtonContainer>
                <RestartButton
                    onClick={() => dispatch(resetQuiz())}
                >
                    Restart
                </RestartButton>
                <Margin right={"10px"} />
                <ExitButton to=".">Exit</ExitButton>
            </ButtonContainer>
        </Container>
    )
}

export default ScoreCard
