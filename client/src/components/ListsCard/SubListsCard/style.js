import styled from "styled-components";
import * as faSolid from "@styled-icons/fa-solid";

export const SubListsCardWrapper = styled.div`
    
    height: 100%;
    width: 100%;
    left: 100%;
    top: 0;
    z-index: 3;
    position: absolute;
    background: inherit;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
    color: white;
    font-family: sans-serif;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
    border: 6px solid #4b5d67;

    @media (max-width: 450px) {
        left: 0;
    }
`;

export const SubListsCardFooter = styled.div`
    height: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: inherit;
    box-shadow: inset 0 0 6px 1px rgba(0,0,0,.25);
`;

export const AddVerbBtnContainer = styled.div`
    width: 30%;
    height: 62%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.voodoo}; 
    border-radius: 5%;
    cursor: pointer;
    transition: filter 0.3s ease;

    &:hover {
        filter: brightness(1.1)
    }
    svg {pointer-events: none;}

`