import React from "react";
import SelectCard from "../SelectCard";
import {ACTIONS} from "../../useQuizConfigReducer"
import useClickOutside from "hooks/useClickOutside";

const TenseCard = (props) => {

    return (
        <SelectCard 
            options={props.options?.[props.selectedMoodIndex]?.children}
            selectedOptionIndex={props.selectedTenseIndex}
            onClickOption={index => props.dispatch({
                type: ACTIONS.SELECT_TENSE_OPTION, 
                payload: {index}
            })}
            onClickOffOption={() => props.dispatch({
                type: ACTIONS.DESELECT_TENSE_OPTION
            })}
            onRightClickOption={() => props.dispatch({
                type: ACTIONS.ADD_TENSE_TO_CONFIG
            })}
        />
    )
}

export default TenseCard;