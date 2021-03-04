import React, {useEffect, useState} from "react";
import ParadigmSelectCard from "../ParadigmSelectCard";
import ACTIONS from "hooks/useQuizConfigReducer/actions"

const MoodCard = (props) => {
    const {selected} = props;
    
    return (
        <ParadigmSelectCard 
            defaultNumOfOptions={6}
            options={selected.options}
            selectedOptionIndex={selected.moodIndex}
            onClickOption={index => props.dispatch({
                type: ACTIONS.SELECT_MOOD_OPTION, 
                payload: {index}
            })}
            onClickOffOption={typeof selected.tenseIndex !== "number"  // false means it's disabled
                ? () => props.dispatch({
                    type: ACTIONS.DESELECT_MOOD_OPTION
                })
                : false
            }
            onRightClickOption={index => props.dispatch({
                type: ACTIONS.ADD_PARADIGM_TO_CONFIG,
                payload: {
                    index,
                    paradigm: "mood"
                }
            })}
        />
    )
}


export default MoodCard;
