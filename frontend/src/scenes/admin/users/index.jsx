import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, useFirstRender } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import LinearProgress from "@mui/material/LinearProgress";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { Link } from "react-router-dom";
const User = () => {
    const [filterModel, setFilterModel] = useState({
        items: [],
        quickFilterValues: [],
    });
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 0.5,
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
            renderCell: ({ row: { id } }) => {
                return (
                    <Box textAlign="center">
                        <Button
                            endIcon={<WysiwygIcon />}
                            variant="outlined"
                            color="green"
                            size="small"
                        >
                            View
                        </Button>
                        <Button
                            sx={{ mx: "0.5rem" }}
                            variant="outlined"
                            size="small"
                            color="primary"
                            endIcon={<EditNoteOutlinedIcon />}
                            component={Link}
                            to={`/admin/user/${id}/edit`}
                        >
                            Edit
                        </Button>
                        <Button
                            endIcon={<DeleteSweepOutlinedIcon />}
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteUser(id)}
                        >
                            Delete
                        </Button>
                    </Box>
                );
            },
        },
    ];

    // Use Effect Hook
    useEffect(() => {
        fetchUser();
    }, []);

    // Handle Delete
    const handleDeleteUser = async (id) => {
        setIsLoading(true);
        await axiosClient
            .delete(`api/users/${id}`)
            .then(({ data }) => {
                fetchUser();
            })
            .catch(({ response }) => console.log(response))
            .finally(() => setIsLoading(false));
    };

    // Fetch User
    const fetchUser = async () => {
        await axiosClient
            .get("api/users")
            .then(({ data }) => {
                setUsers(data.data);
                setIsLoading(false);
            })
            .catch(({ response }) => console.log(response.error));
    };
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
                    filterModel={filterModel}
                    onFilterModelChange={setFilterModel}
                    slots={{
                        loadingOverlay: LinearProgress,
                        toolbar: GridToolbar,
                    }}
                    loading={isLoading}
                    checkboxSelection
                    columns={columns}
                    rows={users}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                />
            </Box>
        </Box>
    );
};

export default User;
