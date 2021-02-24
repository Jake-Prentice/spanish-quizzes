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
    LoadingScreen
} from "./style";
//hooks
import useQuizConfigReducer from "hooks/useQuizConfigReducer";
import {AnimatePresence} from "framer-motion";
import {Ring} from "react-awesome-spinners";


const ConfigPage = (props) => {

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [configureQuizStatus, setConfigureQuizStatus] = useState("");
    const [isWarningModal, setIsWarningModal] = useState(false);
    
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


    useEffect(() => {
      console.log("config first render")
    }, [])
    const configureQuiz = useCallback(async () => {
        setConfigureQuizStatus("loading");
        const config = quizConfigStates.selected.config;
        if (!config) return;
        try {
            let data;
            if (typeof quizConfigStates.selected.saveIndex === "number") {
                data = await configureQuizByConfigId(config._id);
                console.log({data})
            }else {
                data = await configureQuizByUnsavedConfig({config, quizId});
                console.log(data)
            }
            //put data into session
            setTimeout(() => {
                history.push("../quiz");
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
                className={"save-options-ignore"}
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
                <SaveOptions 
                    {...quizConfigStates}
                    quiz={quiz}
                    dispatch={dispatch}
                />
                <Margin all={"0 20px"} />
                <StartButton 
                    onClick={configureQuiz}
                    disabled={typeof quizConfigStates.selected.saveIndex === "number" && !quizConfigStates.configsAreSaved}
                    className="save-options-ignore"
                >
                    Start
                </StartButton>
            </FooterContainer>
            {/* <Prompt 
                when={!quizConfigStates.configsAreSaved} 
                message="You have unsaved changes, are you sure you want to leave?"
            /> */}

        </>
    )

}

export default ConfigPage
