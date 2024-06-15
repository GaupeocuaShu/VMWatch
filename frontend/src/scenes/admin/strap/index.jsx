import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function Strap() {
    return (
        <Box flex={1}>
            <CustomDataGrid
                title="Strap"
                api="straps"
                description="Manage Strap"
            />
        </Box>
    );
}
