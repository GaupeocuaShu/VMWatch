import { Box, Button } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {
    GridRowModes,
    GridToolbarContainer,
    GridToolbar,
} from "@mui/x-data-grid";
export function EditToolbar(props) {
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
