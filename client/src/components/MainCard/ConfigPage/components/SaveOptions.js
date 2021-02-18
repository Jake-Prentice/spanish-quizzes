import React, {useState, useEffect} from "react";
import styled from "styled-components";
import useClickOutside from "hooks/useClickOutside";
import {ACTIONS} from "../useQuizConfigReducer";
import SaveButton from "./SaveButton";
import {Margin} from "components/shared/spacing";
import isEqual from "lodash.isequal";
import {updateQuizConfig} from "api/quiz";
import {useQueryClient} from "react-query";
import {Transition} from "react-transition-group";
import {motion} from "framer-motion";

const numOfSaveOptions = 5;



const Wrapper = styled.div`
    display: flex;
    width: 200px;
    height: 40px;
    /* border: 1px solid white; */
`


const SaveOptionsContainer = styled.div`
    flex-basis: 80%;
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


const saveNewConfigs = async (newConfigs) => {
    for (const newConfig of newConfigs) {
        await updateQuizConfig(newConfig);
    }
}



const SaveOptions = (props) => {
    const {selected} = props;
    const queryClient = useQueryClient();
    
    const [isSavePending, setIsSavePending] = useState(false)
    
    const [saveOptionRef] = useClickOutside(() => props.dispatch({
        type: ACTIONS.RESET_SAVE_OPTION
    }), {
        ignoreByAttr: ".save-options-ignore"
    });


    useEffect(() => {
        if (props.quiz && isSavePending) {
            const newConfigs = props.configs.filter((newConfig, index) => !isEqual(newConfig, props.quiz.configs[index]))
            if (newConfigs.length !== 0) {
                (async() => {
                    await saveNewConfigs(newConfigs)
                    await queryClient.invalidateQueries("quizzes");
                    setIsSavePending(false);
                })()  
            }else {
                setTimeout(() => {
                    setIsSavePending(false);
                }, 500)
            }
        }
    },[isSavePending])

    return (
        <Wrapper>
            <SaveOptionsContainer>
                {Array.from(Array(numOfSaveOptions)).map((_, index) => (
                    <SaveOptionButton
                        className={"save-options-ignore"}
                        disabled={isSavePending}
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
            <SaveButton 
                onClick={() => setIsSavePending(true)}
                isSavePending={isSavePending}
            />
                       
        </Wrapper>
    )
}

export default SaveOptions;

