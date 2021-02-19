import styled, {css} from "styled-components";
import {useRouteMatch} from "react-router-dom";
import {isMobile} from "react-device-detect";

const borderSize = "7px";

export const MainCardContainer = styled.div`

    width: min(80vw, ${props => props.theme.mainCard.width});
    height: 52.5rem;
    max-height: 840px;
    border-radius: 35px;
    border: ${borderSize} solid ${props => props.theme.colors.burntSienna};

    @media (max-width: 450px) {
        width: 100%;
        height: 100vh;
        border-radius: 0;
        border: none;
    }

    ${props => {
        switch(props.pathname) {
            case "/":
                return css`
                    background: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: black;
                `
            case useRouteMatch("/config/:id")?.url:
                return css`
                    background: #322f3d; 
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    overflow: hidden;

                    &::before {
                        content:"${props => props.state.quizTitle}";
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        padding: 0 1.5em;
                        border: 3px solid #9583d8;
                        border-bottom: none;
                        align-items: center;
                        background: #3d3a4d;
                        left: 0;
                        transform: translate(50px, calc(-100% - ${borderSize}));
                        font-size: 0.85rem;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        min-width: 5.5em;
                        height: 40px;
                    }
                    
                   
                    
                `

                case "/quiz":
                    return css`
                    
                        background: #322f3d;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    
                    `
        }   
    }}
`;