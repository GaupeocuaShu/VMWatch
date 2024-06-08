import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, useFirstRender } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataTeam } from "../../../constants/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import LinearProgress from "@mui/material/LinearProgress";
const User = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(users);
    // Fetch User
    useEffect(() => {
        const fetchUser = async () => {
            await axiosClient
                .get("api/users")
                .then(({ data }) => {
                    setUsers(data.data);
                    setIsLoading(false);
                })
                .catch(({ response }) => console.log(response.error));
        };
        fetchUser();
    }, []);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "Action",
            headerName: "Action",
            flex: 1,
            renderCell: () => {
                return (
                    <Box>
                        <Button variant="outlined" size="medium" color="green">
                            View
                        </Button>
                        <Button
                            sx={{ mx: "0.5rem" }}
                            variant="outlined"
                            size="medium"
                            color="blue"
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            size="medium"
                            color="secondary"
                        >
                            Delete
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px" height="100%">
            <Header title="User" subtitle="Managing the User Members" />
            <Box
                height="100vh"
                m="40px 0 0 0"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },

                    "& .css-1x3ucb4-MuiDataGrid-root .MuiDataGrid-container--top [role='row']":
                        {
                            backgroundColor: colors.blueAccent[800],
                        },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[800],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .css-i6qwxd-MuiLinearProgress-root": {
                        height: "10px",
                        backgroundColor: colors.blueAccent[500],
                    },
                    "& .css-1v8wh1w-MuiLinearProgress-bar1": {
                        backgroundColor: colors.blueAccent[800],
                    },
                    "& .css-1v8wh1w-MuiLinearProgress-bar2": {
                        backgroundColor: colors.blueAccent[800],
                    },
                }}
            >
                <DataGrid
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={isLoading}
                    checkboxSelection
                    columns={columns}
                    rows={users}
                />
            </Box>
        </Box>
    );
};

export default User;
