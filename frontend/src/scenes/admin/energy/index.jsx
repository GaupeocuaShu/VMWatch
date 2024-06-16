import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function Energy() {
    return (
        <Box>
            <CustomDataGrid
                title="Energy"
                api="energies"
                description="Manage Energy"
            />
        </Box>
    );
}
