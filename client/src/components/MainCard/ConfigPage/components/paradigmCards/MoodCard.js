import React, {useEffect, useState} from "react";
import SelectCard from "../SelectCard";
import {ACTIONS} from "../../useQuizConfigReducer"

const MoodCard = (props) => {
    
    return (
        <SelectCard 
            options={props.options}
            selectedOptionIndex={props.selectedMoodIndex}
            onClickOption={index => props.dispatch({
                type: ACTIONS.SELECT_MOOD_OPTION, 
                payload: {index}
            })}
            onClickOffOption={typeof props.selectedTenseIndex !== "number"  // false means it's disabled
                ? () => props.dispatch({
                    type: ACTIONS.DESELECT_MOOD_OPTION
                })
                : false
            }
            onRightClickOption={() => props.dispatch({
                type: ACTIONS.ADD_MOOD_TO_CONFIG
            })}
        />
    )
}


export default MoodCard;
