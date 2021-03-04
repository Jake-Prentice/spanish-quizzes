import React, {useState} from "react";
import * as faRegular from "@styled-icons/fa-regular";
import {
    Wrapper,
    SaveButtonContainer,
    LoadSpinner
} from "./style"

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