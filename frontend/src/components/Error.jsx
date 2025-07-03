import React from "react";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";

const Error = ({ errorMessage }) => {
    return (
        <Box margin="20px 200px">
            <Alert severity="error">{errorMessage}</Alert>
        </Box>
    );
};

export default Error;
