import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function DialSize() {
    return (
        <Box>
            <CustomDataGrid
                title="Dial Size"
                api="dial-sizes"
                description="Manage Dial Size"
            />
        </Box>
    );
}
