import * as React from "react";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import axiosClient from "../axios-client";
import { useState, useEffect } from "react";
import ShowSnackbar from "./SnackBar";
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbar,
} from "@mui/x-data-grid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EditToolbar } from "./EditToolbar";
import { Button } from "@mui/material";
import Header from "./Header";
export default function CustomDataGrid({
    api,
    title,
    description,
    customColumn = {
        field: "name",
        headerName: "Name",
        width: 300,
        editable: true,
    },
}) {
    const [filterModel, setFilterModel] = useState({
        items: [],
        quickFilterValues: [],
    });
    const [editMode, setEditMode] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [newID, setNewID] = useState();
    // Notification
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");
    const MySwal = withReactContent(Swal);

    // Use Effect Hook
    useEffect(() => {
        fetchAPI();
    }, []);
    // Fetch API
    const fetchAPI = async () => {
        await axiosClient
            .get(`api/${api}`)
            .then(({ data }) => {
                const rows = data.data;
                setRows(rows);
                let currentID = rows[rows.length - 1]?.id ?? -1;
                setNewID(currentID + 1);
                setIsLoading(false);
            })
            .catch(({ response }) => console.log(response.error));
    };

    // Update Model
    const updateModel = async (data) => {
        setIsLoading(true);
        await axiosClient
            .put(`api/${api}/${data.id}`, data)
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage(`Update ${title} Successfully`);
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
                .delete(`api/${api}/${id}`)
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
        updateModel(newRow);
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { ...customColumn },

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 200,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <Button
                            sx={{ mx: "0.5rem" }}
                            variant="outlined"
                            size="small"
                            color="green"
                            endIcon={<SaveIcon />}
                            onClick={handleSaveClick(id)}
                        >
                            Save
                        </Button>,
                        <Button
                            sx={{ mx: "0.5rem" }}
                            variant="outlined"
                            size="small"
                            color="blue"
                            endIcon={<CancelIcon />}
                            onClick={handleCancelClick(id)}
                        >
                            Cancel
                        </Button>,
                    ];
                }

                return [
                    <>
                        <Button
                            sx={{ mx: "0.5rem" }}
                            variant="outlined"
                            size="small"
                            color="primary"
                            endIcon={<EditNoteOutlinedIcon />}
                            onClick={handleEditClick(id)}
                        >
                            Edit
                        </Button>
                        <Button
                            endIcon={<DeleteSweepOutlinedIcon />}
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleDeleteClick(id)}
                            sx={{ mx: "0.5rem" }}
                        >
                            Delete
                        </Button>
                    </>,
                ];
            },
        },
    ];

    return (
        <>
            <Header title={title} subtitle={description} action="none" />
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

            <ShowSnackbar
                open={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
                message={snackBarMessage}
                severity={severity}
            />
        </>
    );
}
