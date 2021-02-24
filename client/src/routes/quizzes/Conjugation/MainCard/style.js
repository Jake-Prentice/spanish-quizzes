import styled, {css} from "styled-components";
import {useRouteMatch, matchPath} from "react-router-dom";
import {isMobile} from "react-device-detect";

const borderSize = "7px";

const ConfigContainer = css`
    background: #322f3d; 
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
`

const QuizContainer = css`
    background: #322f3d;
    display: flex;
    justify-content: center;
    align-items: center;

`

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
        switch (props.match.path) {
            case props.routes.config:
                return ConfigContainer
            case props.routes.quiz:
                return QuizContainer
        }
    }}
`;


export const Layout = styled.div`
    width: 100vw;
    height: 100vh;

    @media (min-width: 450px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

`