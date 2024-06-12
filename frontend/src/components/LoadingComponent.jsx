import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
const LoadingComponent = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            sx={{ bgcolor: colors.grey[900] }}
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingComponent;
