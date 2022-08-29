import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddlware from "redux-saga";

import App from "./App";
import rootReducer from "./store/reducers/root";
import sagaWatcher from "./store/saga/watcher";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: blue,
      secondary: {
        main: blueGrey[500],
        dark: "#000000",
        light: "#ffffff",
      },
    },
    spacing: 5,
    typography: {
      fontSize: 16,
      fontFamily: "Arial",
      button: {
        fontSize: 20,
      },
    },
  })
);

const saga = createSagaMiddlware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(saga))
);
saga.run(sagaWatcher);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
