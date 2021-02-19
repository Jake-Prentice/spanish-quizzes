import React, {useState, useEffect} from "react";
//components
import SideBar from "components/SideBar"
import MainCard from "components/MainCard"
import ListsCard from "components/ListsCard";
//styles
import {
    HomeWrapper
} from "./style"
import {SvgWaveTop, SvgWaveBottom} from "components/SvgWaves";
//hooks
import {useHistory} from "react-router";

const ListSideBar = props => SideBar(ListsCard, props); // move pls!


const Home = () => {

    const location = useHistory();

    useEffect(() => {
        console.log(window.screen.orientation?.type) 
    })
    return (
        <HomeWrapper>
            <MainCard /> 
            <SvgWaveTop />
            <ListSideBar /> {/*render at top */}
        </HomeWrapper>

    )
}

export default Home;