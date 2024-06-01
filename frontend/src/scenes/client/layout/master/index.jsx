import React from "react";
import Header from "../header/index";
import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import Banner from "../../../../components/Banner";
const Master = () => {
    return (
        <Box>
            <Header />
            <Navbar />

            <Divider />
            <Outlet />
        </Box>
    );
};

export default Master;
