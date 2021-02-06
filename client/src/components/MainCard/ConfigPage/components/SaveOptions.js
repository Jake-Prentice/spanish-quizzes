import React, {useState} from "react";
import styled from "styled-components";
import useClickOutside from "hooks/useClickOutside";
import {ACTIONS} from "../useQuizConfigReducer";

const numOfSaveOptions = 5;

const SaveOptionsContainer = styled.div`
    width: 160px;
    height: 40px;
    border-radius: 8px;
    background-color: rgb(76, 73, 97);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    
    button:first-child {
        margin-left: 3px;
    }
    
    button:last-child {
        margin-right: 3px;
    }

`

const SaveOptionButton = styled.button`
    
    outline: none;
    border: none;
    box-shadow: ${props => props.isSelected ? "inset 0 0 0 1.2px white" : "none"};
    background-color: rgb(237, 90, 121);
    padding: 5.5px 8.5px;
    border-radius: 5px;
    color: white;
    font-size:  12px;
    transition: filter 0.2s ease;
    
    :hover {
        filter: brightness(1.1);
    }

 
`

const SaveOptions = (props) => {

    const [saveOptionRef] = useClickOutside(() => props.dispatch({
        type: ACTIONS.TOGGLE_SAVE_OPTION
    }), {
        ignoreByAttr: ".save-options-ignore"
    });
    return (
        <>
        <SaveOptionsContainer>
            {Array.from(Array(numOfSaveOptions)).map((_, index) => (
                <SaveOptionButton
                    ref={props.selectedSaveIndex === index ? saveOptionRef : null}
                    isSelected={index === props.selectedSaveIndex}
                    onClick={() => props.dispatch({
                        type: ACTIONS.TOGGLE_SAVE_OPTION,
                        payload: {index}    
                    })} 
                    key={index}
                >
                    {index + 1}
                </SaveOptionButton>
            ))}
        </SaveOptionsContainer>        
        </>
    )
}

export default SaveOptions;

