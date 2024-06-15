import * as React from "react";
import { Box, Button, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import LinearProgress from "@mui/material/LinearProgress";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import axiosClient from "../../../axios-client";
import { useState, useEffect } from "react";
import ShowSnackbar from "../../../components/SnackBar";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbar,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function EditToolbar(props) {
    console.log(props);
    const {
        setRows,
        setRowModesModel,
        newID: id,
        editMode,
        setEditMode,
    } = props;
    const handleOpenCreate = () => {
        setEditMode((mode) => !mode);
        setRows((oldRows) => [...oldRows, { id, name: "", isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
        }));
    };

    return (
        <GridToolbarContainer
            sx={{ display: "flex", justifyContent: "space-between" }}
        >
            <Box>
                <GridToolbar />
            </Box>

            <Box>
                <Button
                    size="large"
                    variant="outlined"
                    color="green"
                    endIcon={<AddCircleOutlinedIcon />}
                    onClick={handleOpenCreate}
                    disabled={editMode}
                >
                    Create
                </Button>
            </Box>
        </GridToolbarContainer>
    );
}

export default function Strap() {
    const [filterModel, setFilterModel] = useState({
        items: [],
        quickFilterValues: [],
    });
    const [editMode, setEditMode] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(true);
    const [newID, setNewID] = useState();
    // Notification
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");
    const MySwal = withReactContent(Swal);

    // Use Effect Hook
    useEffect(() => {
        fetchStrap();
    }, []);
    // Fetch Strap
    const fetchStrap = async () => {
        await axiosClient
            .get("api/straps")
            .then(({ data }) => {
                const rows = data.data;
                setRows(rows);
                let currentID = rows[rows.length - 1]?.id ?? -1;
                setNewID(currentID + 1);
                setIsLoading(false);
            })
            .catch(({ response }) => console.log(response.error));
    };

    // Update Strap
    const updateStrap = async (data) => {
        setIsLoading(true);
        await axiosClient
            .put(`api/straps/${data.id}`, data)
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage("Update Strap Successfully");
                setSeverity("success");
                setNewID((newID) => newID + 1);
                setEditMode(false);
            })
            .catch(({ response }) => {
                setSeverity("error");
                setSnackBarOpen(true);
                setSnackBarMessage(response.data.message);
            })
            .finally(() => setIsLoading(false));
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => async () => {
        setIsLoading(true);
        //Show alert
        const result = await MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            await axiosClient
                .delete(`api/straps/${id}`)
                .then(({ data }) => {
                    MySwal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                    setRows(rows.filter((row) => row.id !== id));
                })
                .catch(({ response }) => console.log(response))
                .finally(() => setIsLoading(false));
        }
        setIsLoading(false);
    };

    const handleCancelClick = (id) => () => {
        setEditMode((mode) => !mode);
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        updateStrap(newRow);
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
            editable: true,
        },

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
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
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                        loadingOverlay: LinearProgress,
                    }}
                    slotProps={{
                        toolbar: {
                            setRows,
                            setRowModesModel,
                            setEditMode,
                            showQuickFilter: true,
                            newID,
                            editMode,
                        },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={setFilterModel}
                    checkboxSelection
                    components={{ toolbar: GridToolbar }}
                    loading={isLoading}
                />
            </Box>
            <ShowSnackbar
                open={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
                message={snackBarMessage}
                severity={severity}
            />
        </Box>
    );
}
