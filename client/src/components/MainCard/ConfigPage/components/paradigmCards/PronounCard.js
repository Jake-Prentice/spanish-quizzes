import React from "react";
import SelectCard from "../SelectCard";
import {ACTIONS} from "../../useQuizConfigReducer"

const PronounCard = (props) => {

    return (
        <SelectCard 
            options={props.options?.[props.selectedMoodIndex]?.children?.[props.selectedTenseIndex]?.children}
            onRightClickOption={() => props.dispatch({
            type: ACTIONS.ADD_PRONOUN_TO_CONFIG
        })}
  
    />
    )
}

export default PronounCard;