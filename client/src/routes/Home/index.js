import React, {useState} from "react";
//components
import SideBar from "components/SideBar"
import MainCard from "components/MainCard"
import ListsCard from "components/ListsCard";
//styles
import {
    HomeWrapper
} from "./style"
import {SvgWaveTop, SvgWaveBottom} from "components/SvgWaves";

const ListSideBar = props => SideBar(ListsCard, props); // move pls!

const Home = () => {
    const [currentListId, setCurrentListId] = useState("");

    return (
        <HomeWrapper>
            <ListSideBar setCurrentListId={setCurrentListId}/>
            <MainCard 
                currentListId={currentListId}
            /> 
            <SvgWaveTop />
            <SvgWaveBottom />
        </HomeWrapper>

    )
}

export default Home;