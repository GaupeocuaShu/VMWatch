import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function DialColor() {
    return (
        <Box>
            <CustomDataGrid
                title="Dial Colors"
                api="dial-colors"
                description="Manage Dial Colors"
            />
        </Box>
    );
}
