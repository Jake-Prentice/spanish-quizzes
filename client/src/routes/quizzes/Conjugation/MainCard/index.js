import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import Config from "components/conjugationMainCard/Config";
import Quiz from "components/conjugationMainCard/Quiz";
import {MainCardContainer, Layout} from "./style";

const MainCardLayout = (props) => {
    useEffect(() => {
        console.log("main card init ")
    }, [])
    return (
        <Layout>
            <div style={{position: "relative"}}>
                <MainCardContainer {...props}> 
                    <Route exact path={props.routes.config} component={() => <Config />} />
                    <Route exact path={props.routes.quiz} render={() => <Quiz />} />
                </MainCardContainer>
            </div>
        </Layout>
    )
}

export default MainCardLayout;
