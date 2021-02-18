import React, {useState} from "react";
import styled, {css} from "styled-components";
import * as faRegular from "@styled-icons/fa-regular";
import {motion} from "framer-motion";


const SaveButtonContainer = styled(motion.button)`
    
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

const LoadSpinner = styled(motion.div)`
    border: 3px solid white;
    border-top: 3px solid #7755f3;
    border-radius: 50%;
    padding: 6px;
    
`

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  
`


const SaveButton = (props) => {
    
    const {isSavePending} = props;

    const transition = {
        repeat: Infinity,
        ease: "linear",
        duration: 0.5   
    }

    return (
        <Wrapper className={"save-options-ignore"} >
        {!isSavePending ? (
            <SaveButtonContainer {...props}>
                <faRegular.Save size={"1.1rem"} /> 
            </SaveButtonContainer>
            )
            : (
                <LoadSpinner 
                    animate={{rotate: 360}}
                    transition={transition}
                />
            )}
        </Wrapper>
    )
}

export default SaveButton;