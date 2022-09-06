import React, { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
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
            main: "#fff",
            contrastText: "#fff",
          },
          headerMenuLink:
            mode === "light"
              ? { main: "#000", contrastText: "#000" }
              : { main: "#fff", contrastText: "#fff" },
          iconButton:
            mode === "light"
              ? { main: "#1976d2", contrastText: "#1976d2" }
              : { main: "#fff", contrastText: "#fff" },
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
