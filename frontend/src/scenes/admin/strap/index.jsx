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
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbar,
} from "@mui/x-data-grid";
import { randomTraderName, randomId } from "@mui/x-data-grid-generator";

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            { id, name: "", age: "", isNew: true },
        ]);
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
                    onClick={handleClick}
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
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(true);
    const handleOnChange = (e) => {
        console.log(123123);
    };
    // Use Effect Hook
    useEffect(() => {
        fetchStrap();
    }, []);
    // Fetch User
    const fetchStrap = async () => {
        await axiosClient
            .get("api/straps")
            .then(({ data }) => {
                setRows(data.data);
                setIsLoading(false);
            })
            .catch(({ response }) => console.log(response.error));
    };

    const handleRowEditStop = (params, event) => {
        console.log(1);

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

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
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
                            showQuickFilter: true,
                        },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={setFilterModel}
                    checkboxSelection
                    components={{ toolbar: GridToolbar }}
                    loading={isLoading}
                />
            </Box>
        </Box>
    );
}
