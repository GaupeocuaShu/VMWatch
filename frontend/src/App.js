import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from 'react-router-dom';
import router from './router';
import React, { useEffect, useState } from "react";

import { HelmetProvider } from 'react-helmet-async';
import { useCart } from "./cart/cart";

const App = () => {
    const [theme, colorMode] = useMode();
    const { initializeCart } = useCart((state) => ({
        initializeCart: state.initializeCart,
    }));

    //Initialize
    useEffect(() => {
        initializeCart();
    }, []);
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