import React, {useState, useEffect} from "react";
import useClickOutside from "hooks/useClickOutside";
import ACTIONS from "hooks/useQuizConfigReducer/actions";
import SaveButton from "../SaveButton";
import isEqual from "lodash.isequal";
import {updateQuizConfig} from "api/quiz";
import {useQueryClient} from "react-query";
import {
    Wrapper,
    SaveOptionsContainer,
    SaveOptionButton
} from "./style";

const numOfSaveOptions = 5;

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
                    console.log("here")
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

