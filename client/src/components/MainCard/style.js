import styled from "styled-components";

export const MainCardContainer = styled.div`

    width: min(80vw, 1200px);
    height: 52.5rem;
    max-height: 840px;
    background: #322f3d;
    border-radius: 45px;
    border: 10px solid ${props => props.theme.colors.burntSienna};
    display: flex;
    justify-content: center;
    align-items: center;

`;