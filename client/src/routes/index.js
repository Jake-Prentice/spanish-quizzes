import React from 'react';

import theme from "components/shared/theme"
import {BrowserRouter, Route, Switch, Redirect, useRouteMatch} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./style"
import {QueryClient, QueryClientProvider} from "react-query";
//Pages
import Home from "./Home/"
import Conjugation from "./quizzes/Conjugation";
import Page404 from "./Page404";
import RedirectAs404 from "./RedirectAs404";

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Route render={({location}) => (
              location.state?.is404 === true
              ? <Page404 />
              : (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/conjugation" component={Conjugation} />
                  <RedirectAs404 />
                </Switch>
              )
          )} />
      
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
