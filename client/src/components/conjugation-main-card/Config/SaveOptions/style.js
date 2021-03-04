import styled from "styled-components";
import {motion} from "framer-motion";

export const Wrapper = styled.div`
    display: flex;
    width: 200px;
    height: 40px;
    /* border: 1px solid white; */
`


export const SaveOptionsContainer = styled.div`
    flex-basis: 80%;
    border-radius: 8px;
    background-color: rgb(76, 73, 97);
    display: flex;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    align-items: center;
    padding: 0 0.3em;
    box-shadow:  0 0 10px rgba(0,0,0,.15);

`

export const SaveOptionButton = styled.button`
    outline: none;
    border: none;
    box-shadow: ${props => props.isSelected ? "inset 0 0 0 1.2px white" : "none"};
    background-color: rgb(237, 90, 121);
    padding: 0.45em 0.68em;
    border-radius: 5px;
    color: white;
    font-size:  12px;
    transition: filter 0.2s ease, opacity 0.3s ease;
    

    :disabled {
        opacity: 0.5;
    }

    :hover {
        filter: brightness(1.1);
    }
`
