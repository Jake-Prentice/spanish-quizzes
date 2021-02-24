import React from "react";
import {PageWrapper} from "./style";
import {Route, Switch} from "react-router-dom";
//components
import QuizSelectCard from "components/QuizSelectCard";
import {SvgWaveTop} from "components/svgWaves";
import SideBar from "components/SideBar"
import HowTo from "./HowTo";
import RedirectAs404 from "../../RedirectAs404";
import MainCard from "./MainCard";

const QuizSelectSideBar = props => SideBar(QuizSelectCard, props);


const Conjugation = (props) => {

    const {match} = props;

    const routes = {
        base: match.path + "/",
        config: match.path + "/config/:id",
        quiz: match.path + "/quiz"
    }
  
    return (
        <Switch>
            <Route exact path={Object.values(routes)}>
                <Route exact path={routes.base} component={HowTo} />
                <Route 
                    exact 
                    path={[routes.config, routes.quiz]} 
                    render={props => <MainCard {...props} routes={routes}/>} 
                />
                <SvgWaveTop />
                <QuizSelectSideBar routes={routes}/>
            </Route>
            <RedirectAs404 />
       </Switch>
    )
}


export default Conjugation;

