import styled from "styled-components";

export const BarContainer = styled.div`
    width: 300px;
    height: 23px;
    background: #686180;
    border: 5px solid #514c61;
    border-radius: 2rem;
    box-shadow: 0 0 30px rgba(0,0,0,0.3);
    display: flex;
    position: relative;

    /* ::after {
        content: "hello";
        position: absolute;
        left: 0;
    } */
`

export const Progress = styled.div`
    width: ${props => props.progress}%;
    transition: width 0.5s ease;
    height: 100%;
    background: rgb(190,73,51);
    background: linear-gradient(90deg, rgba(190,73,51,1) 0%, rgba(248,112,86,1) 53%, rgba(251,186,174,1) 100%);
    border-radius: 1rem;
` 