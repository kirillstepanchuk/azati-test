import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import { ROUTE_PAGES } from "./constants";

const Translator = lazy(() => import("./containers/Translator"));
const Favorites = lazy(() => import("./containers/Favorites"));
const History = lazy(() => import("./containers/History"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route exact path={ROUTE_PAGES.main}>
            <Translator />
          </Route>
          <Route exact path={ROUTE_PAGES.favorites}>
            <Favorites />
          </Route>
          <Route exact path={ROUTE_PAGES.history}>
            <History />
          </Route>
          <Redirect to={ROUTE_PAGES.main} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
