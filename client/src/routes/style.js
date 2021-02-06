import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    } 
    html {
        font-size: 16px;
    }
    body {
        background: #1e1d24;
        color: white;
        font-family: sans-serif;
        overflow: auto;
        width: 100vw;
        height: 100vh;
    }
` 