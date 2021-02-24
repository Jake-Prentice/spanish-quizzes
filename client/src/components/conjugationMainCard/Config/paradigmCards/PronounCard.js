import React from "react";
import ParadigmSelectCard from "../ParadigmSelectCard";
import ACTIONS from "hooks/useQuizConfigReducer/actions"

const PronounCard = (props) => {
    const {selected} = props;
    return (
        <ParadigmSelectCard 
            options={selected.options?.[selected.moodIndex]?.children?.[selected.tenseIndex]?.children}
            onRightClickOption={index => props.dispatch({
            type: ACTIONS.ADD_PARADIGM_TO_CONFIG,
            payload: {
                index,
                paradigm: "pronoun"
            }
        })}
  
    />
    )
}

export default PronounCard;