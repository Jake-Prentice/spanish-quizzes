import React, {useEffect, useState, useMemo} from "react";
import {Redirect, useLocation} from "react-router-dom";
import useStateWithSessionStorage from "hooks/useStateWithSessionStorage";
import {useQuizzesQuery} from "hooks/useQuizzesQuery"
//components
import SaveOptions from "./components/SaveOptions";
import {
    ScrollContainer,
    FooterContainer,
    CardContainer
} from "./style";
import SelectCard from "./components/SelectCard";
import Button from "components/shared/Button"
import {MoodCard, TenseCard, PronounCard} from "./components/paradigmCards";
//hooks
import useQuizConfigReducer, {ACTIONS} from "components/MainCard/ConfigPage/useQuizConfigReducer";




// <MoodCard {...quizConfigStates} />



const ConfigPage = (props) => {

    const [quizConfigStates, dispatch] = useQuizConfigReducer();
    const {options, selectedMoodIndex, selectedTenseIndex} = quizConfigStates;
 
    const [loadedQuizId, setLoadedQuizId] = useStateWithSessionStorage("loadedQuizId")
    const [currentQuizConfig, setCurrentQuizConfig] = useStateWithSessionStorage("currentQuizConfig")
    const [selectedSaveIndex, setSelectedSaveIndex] = useStateWithSessionStorage("selectedSaveIndex");
    
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    const {state} = useLocation();
    
    //handle redirection if quiz isn't selected
    useEffect(() => {
        if (!loadedQuizId && state?.selectedQuizId === undefined) setShouldRedirect(true)
        else if (loadedQuizId !== state?.selectedQuizId) {
            setLoadedQuizId(state.selectedQuizId); 
        }
    },[state?.selectedQuizId])

    
    const {data, isLoading} = useQuizzesQuery();

    
    const quiz = useMemo(() => {
        if (!isLoading && !!loadedQuizId) {
            const found = data.find(obj => obj._id === loadedQuizId);
            if (!found) {   // if the quiz is deleted
                sessionStorage.removeItem("loadedQuizId") 
                setShouldRedirect(true);
            }
            else return found;
        }
    }, [data, loadedQuizId]) 

 
    //cache the selected quiz config
    useEffect(() => {
        if (quiz && !isLoading && !isNaN(selectedSaveIndex)) { 
            setCurrentQuizConfig(JSON.stringify(quiz.configs[selectedSaveIndex])) 
        }
    },[selectedSaveIndex])


    if (shouldRedirect) return <Redirect to={"/"} />
            
    return (
        <>
            <ScrollContainer className={"save-options-ignore"}>
                <CardContainer>
                    <MoodCard 
                        {...quizConfigStates}
                        dispatch={dispatch}
                    />
                    <TenseCard 
                        {...quizConfigStates} 
                        dispatch={dispatch}
                    />
                    <PronounCard 
                        {...quizConfigStates} 
                        dispatch={dispatch} 
                    />
                </CardContainer>
            </ScrollContainer>
            
            <FooterContainer className={"ignore-select-options"}>
                <SaveOptions 
                    {...quizConfigStates}
                    dispatch={dispatch}
                />
                <Button className={"save-options-ignore"} variant={"secondary"}>Start</Button>
                {quiz && !isLoading && <>{quiz.title}</>}
            </FooterContainer>
       </>
    )

}

export default ConfigPage
