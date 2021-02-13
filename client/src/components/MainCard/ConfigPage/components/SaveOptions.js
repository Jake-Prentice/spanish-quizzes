import React, {useState} from "react";
import styled from "styled-components";
import useClickOutside from "hooks/useClickOutside";
import {ACTIONS} from "../useQuizConfigReducer";
import SaveButton from "./SaveButton";
import {Margin} from "components/shared/spacing";

const numOfSaveOptions = 5;


const Wrapper = styled.div`
    display: flex;
    width: 200px;
    /* border: 1px solid white; */
`

const SaveOptionsContainer = styled.div`
    flex-basis: 80%;
    height: 40px;
    border-radius: 8px;
    background-color: rgb(76, 73, 97);
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    align-items: center;
    padding: 0 0.3em;
    box-shadow:  0 0 10px rgba(0,0,0,.15);

`

const SaveOptionButton = styled.button`
    outline: none;
    border: none;
    box-shadow: ${props => props.isSelected ? "inset 0 0 0 1.2px white" : "none"};
    background-color: rgb(237, 90, 121);
    padding: 0.45em 0.68em;
    border-radius: 5px;
    color: white;
    font-size:  12px;
    transition: filter 0.2s ease, opacity 0.3s ease;

    :disabled {
        opacity: 0.5;
    }

    :hover {
        filter: brightness(1.1);
    }
`

const SaveOptions = (props) => {
    const {selected} = props;
    
    const [isLoading, setIsLoading] = useState(false)
    
    const [saveOptionRef] = useClickOutside(() => props.dispatch({
        type: ACTIONS.RESET_SAVE_OPTION
    }), {
        ignoreByAttr: ".save-options-ignore"
    });

    return (
        <Wrapper>
            <SaveOptionsContainer>
                {Array.from(Array(numOfSaveOptions)).map((_, index) => (
                    <SaveOptionButton
                        className={"save-options-ignore"}
                        disabled={isLoading}
                        ref={selected.saveIndex === index ? saveOptionRef : null}
                        isSelected={index === selected.saveIndex}
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
            <Margin all={"0 5px"} />
            <SaveButton 
                
                setIsLoading={setIsLoading}
            />    
        </Wrapper>
    )
}

export default SaveOptions;

