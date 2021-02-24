import {addParadigmToConfig} from "utils/quizConfig";
import optionsSchema from "constants/optionsSchema";
import ACTIONS from "./actions";
import {initialStates, initialQuizConfig} from "./initials";




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
        
        case ACTIONS.ADD_PARADIGM_TO_CONFIG:
            if (typeof draft.selectedSaveIndex === "number") {
                draft.configsAreSaved = false;
            }
            addParadigmToConfig(selected, {
                index: action.payload.index,
                paradigm: action.payload.paradigm
            })
            
            return;
        
        default: 
            throw new Error("no action.type or action.type is invalid!")

    }
}

export default reducer;