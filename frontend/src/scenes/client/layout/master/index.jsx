import React from "react";
import Header from "../header/index";
import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import Banner from "../../../../components/Banner";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
const Master = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <Box>
            <Header />
            {matches && <Navbar />}
            <Divider />
            <Outlet />
        </Box>
    );
};

export default Master;
