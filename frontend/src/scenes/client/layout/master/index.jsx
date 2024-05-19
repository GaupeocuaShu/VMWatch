import React from "react";
import Header from "../header/index";
import { Box, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
const Master = () => {
    return (
        <Box>
            <Header />
            <Divider />
            <Outlet />
        </Box>
    );
};

export default Master;
