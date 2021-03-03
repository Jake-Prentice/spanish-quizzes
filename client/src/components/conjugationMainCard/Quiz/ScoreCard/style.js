import styled, {css} from "styled-components";
import {BaseButtonLinkWrapped} from "components/shared/Button";
import {motion} from "framer-motion";

export const Container = styled(motion.div)`
    display: flex;
    background: #433f54;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: max(50%, 370px);
    height: 500px;
    border-radius: 20px;
`

export const ButtonContainer = styled.div`
    background: #4f4b63;
    padding: 1rem 1rem;
    border-radius: 0.5rem;
    display: flex;
`


const SharedButtonStyle = styled(BaseButtonLinkWrapped)`
    padding: 0.9em 0.9em;

    @media (max-width: 500px) {
        font-size: 14px;
    }
  
`


export const RestartButton = styled(SharedButtonStyle)`
    background: #9783e0;
`

export const ExitButton = styled(SharedButtonStyle)`
    background: #e2725f;
`