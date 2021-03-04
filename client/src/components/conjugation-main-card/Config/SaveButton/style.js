import styled, {css} from "styled-components";
import {motion} from "framer-motion";

export const SaveButtonContainer = styled(motion.button)`
    
    padding: 0.37em;
    border-radius: 20%;
    border: none;
    background: #7755f3;
    color: white;
    cursor: pointer;
    box-shadow:  0 0 10px rgba(0,0,0,.15);
    transition: filter 0.2s ease;
    outline: none;


    :hover {
        filter: brightness(1.1);
    }
`

export const LoadSpinner = styled(motion.div)`
    border: 3px solid white;
    border-top: 3px solid #7755f3;
    border-radius: 50%;
    padding: 6px;
    
`

export const Wrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  
`
