import styled from "styled-components";
import {
    MAX_MAINCARD_WIDTH,
    MAINCARD_HEIGHT
} from "components/shared/layout"

export const MainCardContainer = styled.div`

    width: min(80vw, ${MAX_MAINCARD_WIDTH}px);
    height: 52.5rem;
    max-height: 840px;
    background: #322f3d;
    border-radius: 45px;
    border: 10px solid ${props => props.theme.colors.burntSienna};
    display: flex;
    justify-content: center;
    align-items: center;

`;