import React from "react";
import {Route} from "react-router-dom"
//components
import ConfigPage from "./ConfigPage";
import QuizPage from "./QuizPage";
import Button from "components/shared/Button";
//styles
import {
    MainCardContainer
}from "./style"

const MainCard = (props) => {
    const {currentListId} = props;

    return (
        <MainCardContainer>
            <Route exact path={"/"}>
                Home
            </Route>
            <Route exact path={"/config"}>
                <ConfigPage 
                    currentListId={currentListId}
                />
            </Route>
            <Route exact path={"/quiz"} component={QuizPage} />
        </MainCardContainer>
    )
}

export default MainCard
