import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import GeographyChart from "../../../components/GeographyChart";

const Geography = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="Geo Chart" subtitle="Simple" />
            <Box height="75vh" border={`1px solid ${colors.grey[100]}`}>
                <GeographyChart />
            </Box>
        </Box>
    );
};
export default Geography;
