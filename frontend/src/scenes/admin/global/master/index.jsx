import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { ColorModeContext, tokens } from "../../../../theme";
import { useContext } from "react";
const AdminMaster = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    useEffect(() => colorMode.toggleColorMode("dark"), []);
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
