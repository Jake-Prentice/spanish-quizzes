import React, {useEffect} from "react"
import {useImmerReducer} from "use-immer";

import reducer from "./reducer";
import ACTIONS from "./actions";
import {initialStates} from "./initials";

import {convertConfigToOptions} from "utils/quizConfig";

export const QUIZ_CONFIG_STATES_SESSION_KEY = "quizConfigStates";

const useQuizConfigReducer = (quizConfigs, quizId) => {

    const fromSessionStorage = JSON.parse(sessionStorage.getItem(QUIZ_CONFIG_STATES_SESSION_KEY));

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
        sessionStorage.setItem(QUIZ_CONFIG_STATES_SESSION_KEY, JSON.stringify(state))
    },[state])  

    const current = 
        state.quizConfigs?.fromSelectedSave?.[state.selectedSaveIndex] 
        || state.quizConfigs.default;
    
   
    return [{
        selected: {
            ...current,
            saveIndex: state.selectedSaveIndex
        },
        configs: state.quizConfigs.fromSelectedSave.map(({config}) => config),
        configsAreSaved: state.configsAreSaved
    }, dispatch]

}

export default useQuizConfigReducer
