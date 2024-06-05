import React, { useEffect } from "react";

import Header from "../header/index";
import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import Banner from "../../../../components/Banner";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from "../footer";
import { ColorModeContext, tokens } from "../../../../theme";
import { useContext } from "react";

const Master = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    useEffect(() => colorMode.toggleColorMode("light"), []);
    return (
        <Box>
            <Header />
            {matches && <Navbar />}
            <Divider />
            <Outlet />
            <Divider />
            <Footer />
        </Box>
    );
};

export default Master;
