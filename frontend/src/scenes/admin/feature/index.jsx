import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function Feature() {
    return (
        <Box>
            <CustomDataGrid
                title="Feature"
                api="features"
                description="Manage Feature"
            />
        </Box>
    );
}
