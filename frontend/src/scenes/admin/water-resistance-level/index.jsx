import CustomDataGrid from "../../../components/CustomDataGrid";
import { Box } from "@mui/material";
export default function WaterResistanceLevel() {
    return (
        <Box>
            <CustomDataGrid
                title="Water Resistance Level"
                api="water-resistance-levels"
                description="Manage Water Resistance Level"
            />
        </Box>
    );
}
