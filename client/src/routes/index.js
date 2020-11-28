import React from 'react';
import Home from "./Home/"
import theme from "components/shared/theme"
import {BrowserRouter, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./style"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Route path="/" component={Home} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
