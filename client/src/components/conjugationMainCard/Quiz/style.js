import styled, {css} from "styled-components";
import {BaseButton} from "components/shared/Button/style";
import {motion} from "framer-motion";

export const Form = styled(motion.form)`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    h3 {
        font-size: min(max(2vw, 20px), 23px);
    }
    h4 {
        font-size: min(max(2vw, 18px), 20px);
    }
    height: 43%;
    flex-shrink: 0;
    position: absolute;
    margin: auto;
    top: 50%;
    bottom: 50%;
    background: #3e3a4d;
    box-shadow: 0 0 30px rgba(0,0,0,.3);
    border-radius: 30px;
    padding: 0 2.4rem;
    border: 5px solid #9583d8;
    max-width: 85%;

    @media (max-width: 600px) {
        font-size: 16px;
    }
` 


export const QuestionInput = styled.input`
    border-radius: 0.2em;
    border: none;
    height: 1.3em;
    width: 20ch;
    font-size: min(max(3vw, 18px), 23px);
    padding: 1em 1em;
    outline: none;
    /* background: #3d394b; */
    background: #4a455d;
    border-bottom: 0.2rem solid white;
    color: white;

`



export const CheckButton = styled(BaseButton)`
    background: ${props => props.userAnswered ? 
        props.isCorrect
            ? "#3d953d"
            : "#c73c3c"
        : props.theme.colors.burntSienna
    };

    transition: filter 0.3s ease, background 0.2s ease;

    color: white;
    padding: 0.7rem 1.3rem;
`


export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    h4 {
        margin: 0 20px;
    }
    
    

    @media (max-width: 700px) {
        flex-direction: column;
        h4 {
            margin: 20px 20px;
        }
    }
`


export const ProgressBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 43%;
    position: relative;

    ::before {
        content: "";
        border-radius: 0 0 50% 50%/0 0 100% 100%;
        transform: scaleX(1.8);
        border-bottom: 10px solid #5a566b;
        top: 0;
        left: 0;
        background: #3f3c4d;
        position: absolute;
        height: 100%;
        width: 100%;
    }
    
`


export const QuizWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex: 1;
`