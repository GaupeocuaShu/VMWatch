import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function CaseColor() {
    return (
        <Box>
            <CustomDataGrid
                title="Case Color"
                api="case-colors"
                description="Manage Case Color"
            />
        </Box>
    );
}
