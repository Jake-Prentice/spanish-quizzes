import styled, {css} from "styled-components";
import {BaseButtonLinkWrapped} from "components/shared/Button";
import {motion} from "framer-motion";

export const Container = styled(motion.div)`
    display: flex;
    background: #433f54;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: max(min(50%, 500px), min(370px, 80%));
    height: 500px;
    border-radius: 20px;

    @media (max-width: 400px) {
        font-size: 14px;
    }

`

export const ButtonContainer = styled.div`
    background: #4f4b63;
    padding: 1em 1em;
    border-radius: 0.5rem;
    display: flex;
`


const SharedButtonStyle = styled(BaseButtonLinkWrapped)`
    padding: 0.9em 0.9em;

    /* @media (max-width: 500px) {
        font-size: 14px;
    } */
  
`


export const RestartButton = styled(SharedButtonStyle)`
    background: #9783e0;
`

export const ExitButton = styled(SharedButtonStyle)`
    background: #e2725f;
`