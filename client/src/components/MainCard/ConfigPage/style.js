import styled from "styled-components";
import {SelectCardWrapper} from "./components/SelectCard/style";
import {StyledButton} from "components/shared/Button/style";
import Button from "components/shared/Button";


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

export const ScrollContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: nowrap;
    flex: 1;
    overflow: auto;
    scrollbar-width: thin;
    position: relative;

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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25%;
    background: #3d3a4d;
    overflow: hidden;
    box-shadow: 0 0 0 12px #59566b;
;

`





