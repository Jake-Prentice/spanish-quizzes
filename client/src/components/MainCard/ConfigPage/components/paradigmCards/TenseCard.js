import React from "react";
import SelectCard from "../SelectCard";
import {ACTIONS} from "../../useQuizConfigReducer"
import useClickOutside from "hooks/useClickOutside";

const TenseCard = (props) => {
    const {selected} = props;
    return (
        <SelectCard 
            options={props.options?.[selected.moodIndex]?.children}
            selectedOptionIndex={selected.tenseIndex}
            onClickOption={index => props.dispatch({
                type: ACTIONS.SELECT_TENSE_OPTION, 
                payload: {index}
            })}
            onClickOffOption={() => props.dispatch({
                type: ACTIONS.DESELECT_TENSE_OPTION
            })}
            onRightClickOption={index => props.dispatch({
                type: ACTIONS.ADD_TENSE_TO_CONFIG,
                payload: {
                    tenseIndex: index
                }
            })}
        />
    )
}

export default TenseCard;



