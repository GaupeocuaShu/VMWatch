import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

const AdminMaster = () => {
    return (
        <Box display="flex">
            <Sidebar />
            <Box flex={1}>
                <Topbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminMaster;
