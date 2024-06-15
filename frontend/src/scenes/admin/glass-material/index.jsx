import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function GlassMaterial() {
    return (
        <Box>
            <CustomDataGrid
                title="Glass Material"
                api="glass-materials"
                description="Manage Glass Material"
            />
        </Box>
    );
}
