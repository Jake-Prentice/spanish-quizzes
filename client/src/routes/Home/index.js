import React, {useState, useEffect} from "react";
//styles
import {
    HomeWrapper
} from "./style"
import {Redirect} from "react-router-dom";


const Home = () => {
    
    useEffect(() => {

    }, [])

    return <Redirect to="/conjugation"/>
}

export default Home;