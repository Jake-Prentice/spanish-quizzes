import React, {useEffect, useState} from "react";
import SelectCard from "../SelectCard";
import {ACTIONS} from "../../useQuizConfigReducer"

const MoodCard = (props) => {
    const {selected} = props;
    
    return (
        <SelectCard 
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
                type: ACTIONS.ADD_MOOD_TO_CONFIG,
                payload: {
                    moodIndex: index
                }
            })}
        />
    )
}


export default MoodCard;
