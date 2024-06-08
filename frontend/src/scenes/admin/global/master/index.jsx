import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import { ColorModeContext, tokens } from "../../../../theme";
import { useContext, useState } from "react";
import { useAuthContext } from "../../../../contexts/AuthContext";
import axiosClient from "../../../../axios-client";
const AdminMaster = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const { user, setUser } = useAuthContext();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    useEffect(() => {
        colorMode.toggleColorMode("dark");
        async function isAdmin() {
            await axiosClient
                .get("api/is-admin")
                .then(({ data }) => {
                    setIsAdmin(data.isAdmin);
                })
                .catch(({ response }) => {
                    console.log(response.data.message);
                });
        }
        isAdmin();
    }, []);
    if (!user || isAdmin === false) return <Navigate to="/" />;
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
