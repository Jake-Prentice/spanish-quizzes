import React from "react";
import SelectCard from "../SelectCard";
import {ACTIONS} from "../../useQuizConfigReducer"

const PronounCard = (props) => {
    const {selected} = props;
    return (
        <SelectCard 
            options={selected.options?.[selected.moodIndex]?.children?.[selected.tenseIndex]?.children}
            onRightClickOption={index => props.dispatch({
            type: ACTIONS.ADD_PRONOUN_TO_CONFIG,
            payload: {
                pronounIndex: index
            }
        })}
  
    />
    )
}

export default PronounCard;