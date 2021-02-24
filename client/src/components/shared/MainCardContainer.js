import styled, {css} from "styled-components";
import {useRouteMatch, matchPath} from "react-router-dom";
import {isMobile} from "react-device-detect";

const borderSize = "7px";


const MainCardContainer = styled.div`

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
`;

export default MainCardContainer;