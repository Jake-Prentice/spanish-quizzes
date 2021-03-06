import styled, {css} from "styled-components";
import {BaseButton} from "components/shared/Button/style";

export const BurgerButton = styled(BaseButton)`
    height: 3rem;
    width: 3rem;
    padding: .2rem .2rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 1.7rem;
    top: 1rem;
    background: #4c447869;
    :disabled {opacity: 1};
    box-shadow: none;
  
`;

export const BurgerLine = styled.div`
    width: 80%;
    height: 7%;
    border-radius: 15%;
    background: white;
` 