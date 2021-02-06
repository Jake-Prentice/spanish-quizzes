import React, {useReducer, useEffect} from "react";
import {useImmerReducer} from "use-immer";
import {options} from "./options";
import convertConfigToOptions from "./convertConfigToOptions"

export const ACTIONS = {
    TOGGLE_SAVE_OPTION: "toggle-save-option", 
    SELECT_MOOD_OPTION: "select-mood-option",
    SELECT_TENSE_OPTION: "select-tense-option",
    DESELECT_MOOD_OPTION: "deselect-mood-option",
    DESELECT_TENSE_OPTION: "deselect-tense-option",
    ADD_MOOD_TO_CONFIG: "add-mood-to-config",
    ADD_TENSE_TO_CONFIG: "add-tense-to-config",
    ADD_PRONOUN_TO_CONFIG: "add-pronoun-to-config"
};


const initialQuizConfig = {                
    options,
    selectedMoodIndex: null,
    selectedTenseIndex: null
}

const initialStates = {
    quizConfigs: [
        initialQuizConfig,
        initialQuizConfig,
        initialQuizConfig,
        initialQuizConfig,
        initialQuizConfig,
        initialQuizConfig,
    ],
    selectedSaveIndex: 0
}

const reducer = (draft, action) => { 
    const currentQuizConfig = draft.quizConfigs[draft.selectedSaveIndex];
    switch(action.type) {
        case ACTIONS.TOGGLE_SAVE_OPTION:
            if (draft.selectedSaveIndex === action.payload.index) {
                draft.selectedSaveIndex = initialStates.selectedSaveIndex;
            }else {
                draft.selectedSaveIndex = action.payload.index;
            }
            return;
            
        case ACTIONS.SELECT_MOOD_OPTION:
            currentQuizConfig.selectedTenseIndex = initialQuizConfig.selectedTenseIndex;
            currentQuizConfig.selectedMoodIndex = action.payload.index;
            return;
        case ACTIONS.SELECT_TENSE_OPTION:
            currentQuizConfig.selectedTenseIndex = action.payload.index;
            return;
        case ACTIONS.DESELECT_MOOD_OPTION:
            currentQuizConfig.selectedMoodIndex = initialQuizConfig.selectedMoodIndex
            return;
        case ACTIONS.DESELECT_TENSE_OPTION:
            currentQuizConfig.selectedTenseIndex = initialQuizConfig.selectedTenseIndex;
            return;
    }
}

const sessionStorageKey = "quizConfigStates";

const useQuizConfigReducer = () => {

    const [state, dispatch] = useImmerReducer(
        reducer, 
         JSON.parse(sessionStorage.getItem(sessionStorageKey)) ||initialStates
    );

    useEffect(() => {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(state))
    },[state])  

    const current = state.quizConfigs[state.selectedSaveIndex];

    return [{
        ...current,
        selectedSaveIndex: state.selectedTenseIndex - 1 //taken in to account the default one at index 0
    }, dispatch]

}

export default useQuizConfigReducer
