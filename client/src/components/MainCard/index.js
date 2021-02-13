import React, {useState} from "react";
import {Route, useLocation, useRouteMatch} from "react-router-dom"
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
        <div style={{position: "relative"}}>
            <MainCardContainer {...useLocation()}>
                <Route exact path={"/"}>
                    This is the home page
                </Route>
                <Route path={"/config/:id"} component={ConfigPage} />
                <Route exact path={"/quiz"} component={QuizPage} />
            </MainCardContainer>
        </div>
    )
}

export default MainCard
