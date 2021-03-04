import React from "react";
import ParadigmSelectCard from "../ParadigmSelectCard";
import ACTIONS from "hooks/useQuizConfigReducer/actions"
import useClickOutside from "hooks/useClickOutside";

const TenseCard = (props) => {
    const {selected} = props;
    return (
        <ParadigmSelectCard 
            options={selected.options?.[selected.moodIndex]?.children}
            selectedOptionIndex={selected.tenseIndex}
            onClickOption={index => props.dispatch({
                type: ACTIONS.SELECT_TENSE_OPTION, 
                payload: {index}
            })}
            onClickOffOption={() => props.dispatch({
                type: ACTIONS.DESELECT_TENSE_OPTION
            })}
            onRightClickOption={index => props.dispatch({
                type: ACTIONS.ADD_PARADIGM_TO_CONFIG,
                payload: {
                    index,
                    paradigm: "tense"
                }
            })}
        />
    )
}

export default TenseCard;



