import React from 'react';
import Home from "./Home/"
import theme from "components/shared/theme"
import {BrowserRouter, Route, useLocation} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./style"
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Route path="/" component={Home} />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
