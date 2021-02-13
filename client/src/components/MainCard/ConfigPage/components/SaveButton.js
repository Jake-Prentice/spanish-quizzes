import React, {useState} from "react";
import styled from "styled-components";
import * as faRegular from "@styled-icons/fa-regular";


const SaveButtonContainer = styled.button`
    align-self: center; 
    padding: 0.35em;
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

    :disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`


const onSave = () => {

}

const SaveButton = (props) => {
    
    return (
        <SaveButtonContainer  
                className={"save-options-ignore"} 
                onClick={props => onSave(props)}
        >
            <faRegular.Save size={"1.1rem"} /> 
        </SaveButtonContainer>
    )
}

export default SaveButton;