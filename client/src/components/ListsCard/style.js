import styled, {css} from "styled-components";

//parent card specific
export const CardWrapper = styled.div`
    width: 320px;
    height: 560px;
    background: ${props => props.theme.colors.tuna};
    border: 4px solid #4b5d67;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 10;
  
`;

export const ErrorContainer = styled.div`

    width: 85%;
    height: 50%;
    background: ${props => props.theme.colors.radicalRed};
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    color: white;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    font-size: 1.15rem;
    opacity: 0;
`;

//shared
export const ListItem = styled.div`
    width: 80%;
    min-height: 3.1rem;
    background: ${props => props.theme.colors.strikeMaster};
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 1rem;
    font-family: sans-serif;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    margin-bottom: .7rem;
    ${props => props.selected ? "box-shadow: 0 0 0 1.5px white" : "none"};
    :hover {
        filter: brightness(1.1);
    }
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    pointer-events: ${props => props.disabled ? "none" : "inherit"};

    svg {
        margin-right: .5rem;
        font-weight: 400;
        font-size: 5rem;
    }

    svg:last-child {
        margin-right: 0;
    }

    svg:first-child {
        margin-left: 0.5rem;
    }
`;

export const StyledInput = styled.input`
    background: inherit;
    outline: none;
    height: 100%;
    width: 80%;
    border: none;
    padding-right: .3rem;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    align-self: flex-start;
`;

export const CheckCircleBtn = styled.button`
    background: none;
    outline: none;
    border: none;
    position: absolute;
    right: -1.3rem;
    cursor: pointer;

    svg {
        color: green;
        font-size: 1rem;
    }
`;

export const ListContainer = styled.div`
    
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 1rem;
    flex-direction: column;
    overflow-y: auto;
    flex: 2;

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;

    }
    &::-webkit-scrollbar
    {
        width: 8px;
        background-color: ${props => props.theme.colors.wildSand};
    }
    &::-webkit-scrollbar-thumb
    {
	    background-color: ${props => props.theme.colors.burntSienna};	
    }
    
`;


export const StyledButton = styled.button`
    width: 4rem;
    height: 2rem;
    background: ${props => props.background || "#87556f"};;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 .7rem;
    font-size: .7rem;
    
    :hover {
        filter: brightness(1.1);
    }
`;

export const CardFooter = styled.div`
    width: 100%;
    height: 15%;
    background: ${props => props.theme.colors.voodoo};
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
    button { 
        margin: 0 0.7rem;
    }
`;