import styled, {css} from "styled-components";

export const BaseButton = styled.button`
    border-radius: 0.4em;
    border: none;
    cursor: pointer;
    outline: none;
    transition: filter 0.2s ease;
    margin: 0 .7rem; /*make sure to turn off */
    box-shadow: 0 0 0.3125em 0.1em rgba(0,0,0,.2), 
        inset 0 0 0.06em rgba(0,0,0,.4);
    
    :hover {
        filter: brightness(1.1);
    }

    :active {
        box-shadow: inset 0 0 0.06em rgba(0,0,0,.4);
    }

    :disabled {
        opacity: 0.5;
    }

`

export const StyledButton = styled(BaseButton)`

    ${props => {
        switch (props.size) {
            case "small":
                return css`
                    padding: 1em 1em;
                    font-size: 0.7rem;
                `;
            case "medium":
                return css`
                    font-size: 0.9rem;
                    padding: 1em 1.4em;
                `
            case "large":
                return css`
                    font-size: 1rem;
                    padding: 1.1em 1.8em;
                `;
        }
    }};

    ${props => {
        switch (props.variant) {
            case "primary":
                return css`
                    background: #605a70;
                    color: white;
                `;
            case "secondary":
                return css`
                    background: ${props => props.theme.colors.burntSienna};
                    color: white; 
                `;
            case "light":
                return css`
                    background: ${props => props.theme.colors.wildSand};
                    color: black;
                `
        }
    }};
`;

