import React, { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { THEMES, COLORS } from "../../constants";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || THEMES.light
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === THEMES.light ? THEMES.dark : THEMES.light
        );
        localStorage.setItem(
          "themeMode",
          mode === THEMES.light ? THEMES.dark : THEMES.light
        );
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          headerLink: {
            main: COLORS.white,
            contrastText: COLORS.white,
          },
          link:
            mode === THEMES.light
              ? { main: COLORS.black, contrastText: COLORS.black }
              : { main: COLORS.white, contrastText: COLORS.white },
          iconButton:
            mode === THEMES.light
              ? { main: COLORS.blue, contrastText: COLORS.blue }
              : { main: COLORS.white, contrastText: COLORS.white },
        },
        spacing: 5,
        typography: {
          fontSize: 16,
          fontFamily: "Arial",
          button: {
            fontSize: 20,
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
