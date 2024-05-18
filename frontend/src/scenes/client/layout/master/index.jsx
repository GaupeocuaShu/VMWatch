import React from "react";
import Header from "../header/index";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
const Master = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box width="1000px">
                <Header />
            </Box>
            <Box>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Master;
