import styled, {css} from "styled-components";
import {SelectCardWrapper} from "./ParadigmSelectCard/style";
import Button from "components/shared/Button";

const borderSize = "7px";

export const CardContainer = styled.div`
    display: flex;
    flex: 0 0 ${props => `calc(${props.theme.mainCard.width} * 0.77)`};
    padding: 0 50px;
    justify-content: center;
    margin: auto;

    ${SelectCardWrapper} {
        margin: 0 20px;
    }
`

export const LoadingScreen = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`

export const ScrollContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: nowrap;
    flex: 1;
    overflow: auto;
    scrollbar-width: thin;

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;

    }
    &::-webkit-scrollbar
    {
        width: 5px;
        background-color: ${props => props.theme.colors.wildSand};
    }
    &::-webkit-scrollbar-thumb
    {
	    background-color: #f28672;
        border-radius: 15px;
    }

    &::before {
        content:"${props => props.quizTitle || "loading..."}";
        position: absolute;
        display: flex;
        justify-content: center;
        padding: 0 1.5em;
        border: 3px solid #9583d8;
        border-bottom: none;
        align-items: center;
        background: #3d3a4d;
        left: 0;
        top: 0;
        transform: translate(50px, -100%);
        font-size: 0.85rem;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        min-width: 5.5em;
        height: 40px;
    }
  
`

export const StartButton = styled(Button)`
        font-size: 0.8rem;
        padding: 0.8em 1.2em;
        min-width: 6.5em;
        min-height:3em;
        border-radius: 8px;
        background: ${props => props.theme.colors.burntSienna};
        color: white;
        letter-spacing: 1.8px;
`

export const FooterContainer = styled.div`
    display: flex;
    padding: 0 20px;
    align-items: center;
    width: 100%;
    height: 25%;
    background: #3d3a4d;
    overflow: hidden;
    box-shadow: 0 0 0 12px #59566b;

    @media (max-width: 650px) {
        flex-direction: column;
        overflow: scroll;
    }
;

`

export const SliderContainer = styled.div`
    background: green;
    width: 80%;
    height: 80%;
`