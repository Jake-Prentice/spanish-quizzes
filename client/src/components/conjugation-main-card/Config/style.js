import styled, {css} from "styled-components";
import {SelectCardWrapper} from "./ParadigmSelectCard/style";
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

    ::-webkit-scrollbar {
        height: 0.8em;        
        background: white;
    }

    ::-webkit-scrollbar-thumb {
        background: #59566b;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }​

    


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


export const SliderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #4d4961;
    border-radius: 1.5rem;
    padding: 1rem 2rem;
`



export const FooterFirstHalfWrapper = styled.div`
    display: flex;
    margin: 0 20px 0 0;
    align-items: center;
    min-width: 50%;
    height: 100%;
`

export const FooterSecondHalfWrapper = styled.div`
    display: flex;
    justify-content: start;
    height: 100%;
    align-items: center;
    flex: 1;
`

export const FooterContainer = styled.div`
    display: flex;
    padding: 0 20px;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    height: 25%;
    background: #3d3a4d;
    box-shadow: 0 0 0 12px #59566b;
    flex-wrap:wrap;
    /* gap: 1em; */
   
    
    @media (max-width: 500px) {
        padding: 10px 0px;
        flex-direction: column;
        flex-wrap: nowrap;

        & > * {
            margin: 20px 0;
        }
    } 
    
;

`

