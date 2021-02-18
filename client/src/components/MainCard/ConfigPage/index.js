import React, {useEffect, useState, useMemo} from "react";
import {Redirect, useLocation, useParams, Prompt} from "react-router-dom";
import useStateWithSessionStorage from "hooks/useStateWithSessionStorage";
import {useQuizzesQuery} from "hooks/useQuizzesQuery"
//components
import SaveOptions from "./components/SaveOptions";
import {Margin} from "components/shared/spacing";
import {MoodCard, TenseCard, PronounCard} from "./components/paradigmCards";

import {
    ScrollContainer,
    FooterContainer,
    CardContainer,
    StartButton
} from "./style";
//hooks
import useQuizConfigReducer, {ACTIONS} from "./useQuizConfigReducer";


const ConfigPage = (props) => {

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const quizId = useParams().id;

    useEffect(() => {
        if (quizId === undefined) setShouldRedirect(true)
    },[quizId])

    const {data, isLoading} = useQuizzesQuery();

    const quiz = useMemo(() => {
        if (!isLoading && !!quizId) {
            const found = data.find(obj => obj._id === quizId);
            if (!found) {   // if the quiz is deleted
                sessionStorage.removeItem("quizId") 
                setShouldRedirect(true);
            }
            else return found;
        }
    }, [data, quizId]) 

    const [quizConfigStates, dispatch] = useQuizConfigReducer(
        quiz?.configs, 
        quizId
    );

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
                    quiz={quiz}
                    dispatch={dispatch}
                />
                <Margin all={"0 20px"} />
                <StartButton 
                    to={"/quiz"}
                    className="save-options-ignore"
                >
                    Start
                </StartButton>
            </FooterContainer>
            {/* <Prompt 
                when={true} 
                message="You have unsaved changes, are you sure you want to leave?"
            /> */}
       </>
    )

}

export default ConfigPage
