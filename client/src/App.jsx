import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { ROUTE_PAGES } from "./constants";

const Translator = lazy(() => import("./pages/Translator"));
const Favorites = lazy(() => import("./pages/Favorites"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={ROUTE_PAGES.main}>
            <Translator />
          </Route>
          <Route exact path={ROUTE_PAGES.favorites}>
            <Favorites />
          </Route>
          <Redirect to={ROUTE_PAGES.main} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
