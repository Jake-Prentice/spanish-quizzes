import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import Config from "components/conjugation-main-card/Config";
import Quiz from "components/conjugation-main-card/Quiz";
import {MainCardContainer, Layout} from "./style";

const MainCardLayout = (props) => {
    
    return (
        <Layout>
            <div style={{position: "relative"}}>
                <MainCardContainer {...props}> 
                    <Route exact path={props.routes.config} component={Config} />
                    <Route exact path={props.routes.quiz} component={Quiz} />
                </MainCardContainer>
            </div>
        </Layout>
    )
}

export default MainCardLayout;
