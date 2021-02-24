import optionsSchema from "constants/optionsSchema";

export const initialQuizConfig = {                
    options: undefined,
    config: undefined,
    moodIndex: null,
    tenseIndex: null
}

export const initialStates = {
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