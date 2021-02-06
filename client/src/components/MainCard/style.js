import styled, {css} from "styled-components";

export const MainCardContainer = styled.div`

    width: min(80vw, ${props => props.theme.mainCard.width});
    height: 52.5rem;
    max-height: 840px;
    border-radius: 35px;
    border: 7px solid ${props => props.theme.colors.burntSienna};
    /* border: 7px solid black; */

    ${props => {
        switch(props.currentPage) {
            case "/":
                return css`
                    background: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: black;
                `
            case "/config":
                return css`
                    background: #322f3d; 
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    overflow: hidden;

                `
        }   
    }}
`;