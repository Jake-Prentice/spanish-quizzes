import styled, {css} from "styled-components";

export const BaseButton = styled.button`
    border-radius: 0.4em;
    border: none;
    cursor: pointer;
    outline: none;
    color: white;
    transition: filter 0.2s ease, opacity 0.2s ease;
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
                    font-size: 0.8rem;
                    padding: 0.8em 1.2em;
                    min-width: 6.5em;
                    min-height:3em;
                    border-radius: 8px;
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

