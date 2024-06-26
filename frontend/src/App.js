import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from 'react-router-dom';
import router from './router';
import React from 'react'
import { HelmetProvider } from 'react-helmet-async';
const App = () => {
    const [theme, colorMode] = useMode();
    return (
        <HelmetProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </HelmetProvider>
    )
}

export default App