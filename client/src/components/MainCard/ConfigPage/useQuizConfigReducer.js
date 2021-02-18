import React, {useReducer, useEffect, useMemo} from "react";
import {useImmerReducer} from "use-immer";
import {optionsSchema} from "./optionsSchema";
import {
    convertConfigToOptions, 
    traverseEachObj,
    addParadigmToConfig
} from "./helpers"

export const sessionStorageKey = "quizConfigStates";


export const ACTIONS = {
    LOAD_OPTIONS: "load-options",

    TOGGLE_SAVE_OPTION: "toggle-save-option", 
    RESET_SAVE_OPTION: "reset-save-option",
    
    SELECT_MOOD_OPTION: "select-mood-option",
    SELECT_TENSE_OPTION: "select-tense-option",
    DESELECT_MOOD_OPTION: "deselect-mood-option",
    DESELECT_TENSE_OPTION: "deselect-tense-option",
    
    ADD_MOOD_TO_CONFIG: "add-mood-to-config",
    ADD_TENSE_TO_CONFIG: "add-tense-to-config",
    ADD_PRONOUN_TO_CONFIG: "add-pronoun-to-config",
};


//initial states
const initialQuizConfig = {                
    options: undefined,
    config: undefined,
    moodIndex: null,
    tenseIndex: null
}

const initialStates = {
    quizConfigs: {
        default: {
            ...initialQuizConfig,
            options: JSON.parse(JSON.stringify(optionsSchema)),
            config: {
                filterOptions: {
                    moods: []
                }
            }
        },
        fromSelectedSave: [
            {...initialQuizConfig},
            {...initialQuizConfig},
            {...initialQuizConfig},
            {...initialQuizConfig},
            {...initialQuizConfig},
        ]
    },
    selectedSaveIndex: null,
    currentQuizId: null,
    isLoadedOptions: false,
    configsAreSaved: true
}


const reducer = (draft, action) => { 
    const selected = 
        draft.quizConfigs?.fromSelectedSave?.[draft.selectedSaveIndex] 
        || draft.quizConfigs.default;
   
    switch(action.type) {
        case ACTIONS.LOAD_OPTIONS:
            draft.quizConfigs.fromSelectedSave.forEach((config, index) => {
                config.options = action.payload[index].options;
                config.config = action.payload[index].config;
            })
   
            draft.isLoadedOptions = true;
            return;

        case ACTIONS.TOGGLE_SAVE_OPTION:
            if (draft.selectedSaveIndex === action.payload.index) {
                draft.selectedSaveIndex = initialStates.selectedSaveIndex;
            }else {
                draft.selectedSaveIndex = action.payload.index;
            }
            return;
        case ACTIONS.RESET_SAVE_OPTION:
            draft.selectedSaveIndex = initialStates.selectedSaveIndex
            return;

        case ACTIONS.SELECT_MOOD_OPTION:
            selected.tenseIndex = initialQuizConfig.tenseIndex;
            selected.moodIndex = action.payload.index;
            return;
        case ACTIONS.SELECT_TENSE_OPTION:
            selected.tenseIndex = action.payload.index;
            return;

        case ACTIONS.DESELECT_MOOD_OPTION:
            selected.moodIndex = initialQuizConfig.moodIndex
            return;
        case ACTIONS.DESELECT_TENSE_OPTION:
            selected.tenseIndex = initialQuizConfig.tenseIndex;
            return;
        
        case ACTIONS.ADD_MOOD_TO_CONFIG:
            
            addParadigmToConfig(selected, {
                index: action.payload.moodIndex,
                paradigm: "mood"
            })
            
            return;
        case ACTIONS.ADD_TENSE_TO_CONFIG:
         
            addParadigmToConfig(selected, {
                index: action.payload.tenseIndex,
                paradigm: "tense"
            })

            return;
        case ACTIONS.ADD_PRONOUN_TO_CONFIG:
            addParadigmToConfig(selected, {
                index: action.payload.pronounIndex,
                paradigm: "pronoun"
            });
            return;
        
        default: 
            throw new Error("no action.type!")

    }
}



const useQuizConfigReducer = (quizConfigs, quizId) => {

    const fromSessionStorage = JSON.parse(sessionStorage.getItem(sessionStorageKey));

    const [state, dispatch] = useImmerReducer(
        reducer, 
        fromSessionStorage || initialStates
    );

    useEffect(() => {
        //only run first time not after reload page
        if (quizConfigs && !state.isLoadedOptions) { 
            dispatch({type: ACTIONS.LOAD_OPTIONS, payload: 
                quizConfigs.map(config => convertConfigToOptions(config))
            })
        }
    }, [quizConfigs, quizId])

    useEffect(() => {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(state))
    },[state])  

    const current = 
        state.quizConfigs?.fromSelectedSave?.[state.selectedSaveIndex] 
        || state.quizConfigs.default;
    
   
    return [{
        selected: {
            ...current,
            saveIndex: state.selectedSaveIndex
        },
        configs: state.quizConfigs.fromSelectedSave.map(({config}) => config)
    }, dispatch]

}

export default useQuizConfigReducer


/* 
  

*/