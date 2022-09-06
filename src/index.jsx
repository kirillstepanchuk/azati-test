import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddlware from "redux-saga";

import App from "./App";
import rootReducer from "./store/reducers/root";
import sagaWatcher from "./store/saga/watcher";
import CustomThemeProvider from "./components/CustomThemeProvider/CustomThemeProvider";

const saga = createSagaMiddlware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(saga))
);
saga.run(sagaWatcher);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </Provider>
);
