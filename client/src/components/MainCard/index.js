import React, {useState} from "react";
import {Route, useLocation} from "react-router-dom"
//components
import ConfigPage from "./ConfigPage";
import QuizPage from "./QuizPage";
import Button from "components/shared/Button";
//styles
import {
    MainCardContainer
}from "./style"

const MainCard = (props) => {

    return (
        <MainCardContainer currentPage={useLocation().pathname}>
            <Route exact path={"/"}>
                This is the home page
            </Route>
            <Route exact path={"/config"} component={ConfigPage} />
            <Route exact path={"/quiz"} component={QuizPage} />
        </MainCardContainer>
    )
}

export default MainCard
