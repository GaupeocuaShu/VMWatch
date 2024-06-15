import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function DialShape() {
    return (
        <Box>
            <CustomDataGrid
                title="Dial Shape"
                api="dial-shapes"
                description="Manage Dial Shape"
            />
        </Box>
    );
}
