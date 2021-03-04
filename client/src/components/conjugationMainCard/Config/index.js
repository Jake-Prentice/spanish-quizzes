import React, {useEffect, useState, useMemo, useCallback} from "react";
import {Redirect, useParams, Prompt, useHistory} from "react-router-dom";
import {useQuizzesQuery} from "hooks/useQuizzesQuery"
import {configureQuizByConfigId, configureQuizByUnsavedConfig} from "api/quiz";
//components
import SaveOptions from "./SaveOptions";
import {Margin} from "components/shared/spacing";
import {MoodCard, TenseCard, PronounCard} from "./paradigmCards";
import {
    ScrollContainer,
    FooterContainer,
    CardContainer,
    StartButton,
    LoadingScreen,
    SliderContainer,
    FooterFirstHalfWrapper,
    FooterSecondHalfWrapper
} from "./style";
//hooks
import useQuizConfigReducer from "hooks/useQuizConfigReducer";
import {AnimatePresence} from "framer-motion";
import {Ring} from "react-awesome-spinners";
import Flex from "styled-flex-component";



const ConfigPage = (props) => {

    
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [configureQuizStatus, setConfigureQuizStatus] = useState("");
    const [isWarningModal, setIsWarningModal] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState(10);
    


    const history = useHistory();
    const quizId = useParams().id;

    useEffect(() => {
        if (quizId === undefined) setShouldRedirect(true)
    },[quizId])

    const {data, isLoading} = useQuizzesQuery();

    const quiz = useMemo(() => {
        if (!isLoading && !!quizId) {
            const found = data.find(obj => obj._id === quizId);
            if (!found) {   // if the quiz is deleted
                setShouldRedirect(true);
            }
            else return found;
        }
    }, [data, quizId]) 

    const [quizConfigStates, dispatch] = useQuizConfigReducer(
        quiz?.configs, 
        quizId
    );


    const configureQuiz = useCallback(async () => {
        setConfigureQuizStatus("loading");
        const config = quizConfigStates.selected.config;
        if (!config) return;
        try {
            let conjugations;
            if (typeof quizConfigStates.selected.saveIndex === "number") {
                conjugations = await configureQuizByConfigId(config._id);
            }else {
                conjugations = await configureQuizByUnsavedConfig({config, quizId});
            }
            //put data into session

            sessionStorage.removeItem("quiz")
            setTimeout(() => {
                history.push("../quiz", {conjugations, numOfQuestions});
            },800)
        }catch(err) {
            setConfigureQuizStatus("error")
        }
        

    }, [quizConfigStates, configureQuizStatus ])



    if (shouldRedirect) return <Redirect to={".."} />


    if (configureQuizStatus === "loading") {
        return (
            <LoadingScreen> 
                <h1>configuring quiz</h1>
                <Margin bottom={"30px"} />
                <Ring color={"#9583d8"}/>
            </LoadingScreen>
        )
    }

    return (
        <>
            <ScrollContainer 
                className={"save-options-ignore ignore-select-options"}
                quizTitle={quiz?.title}
            >
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
                
                    <SliderContainer>
                        {numOfQuestions}
                        <input type="range" min={0} max={400} step={5} onChange={e => setNumOfQuestions(+e.target.value)} />
                    </SliderContainer>
          
                    <SaveOptions 
                        {...quizConfigStates}
                        quiz={quiz}
                        dispatch={dispatch}
                    />
                  
                    <StartButton 
                        onClick={configureQuiz}
                        disabled={typeof quizConfigStates.selected.saveIndex === "number" && !quizConfigStates.configsAreSaved}
                        className="save-options-ignore"
                    >
                        Start
                    </StartButton>
        
            </FooterContainer>

        </>
    )

}

export default ConfigPage
