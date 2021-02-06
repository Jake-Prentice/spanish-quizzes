import styled, {css} from "styled-components";

export const SelectCardOption = styled.div`
    width: 90%;
    height: 53px;
    background: #545067;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 16px;
    font-family: sans-serif;
    border-radius: 7px;
    cursor: pointer;
    box-shadow: 0 0 3px 1px rgba(0,0,0, .25);
    color: white;

    ${props => props.isHighlighted && css`
        border: 1.5px dashed white;
    `}
    
    ${props => props.isSelected && css`
         box-shadow: 0 0 10px 2px rgba(0,0,0, .3);
         background: #5f5a74;
         
    `}

    :hover {
        filter: brightness(1.1);
    }
`


export const SelectCardWrapper = styled.div`
    flex-basis: 250px;
    flex-shrink: 0;
    background: #434055;
    border-radius: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.875em 0.5em 2.8125em;
    font-size: 14px;
    box-shadow: 0 0 8px 2px rgba(0,0,0, .25);
    user-select: none;  /* maybe only for ipads, phones */ 
 

    ${SelectCardOption} {
        margin-bottom: 11.2px;
    }


    ${props => props.isDisabled && css`
        opacity: 0.5;
        pointer-events: none;
    `}
    
`;

