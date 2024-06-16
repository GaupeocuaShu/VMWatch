import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";

const NoImage = ({ title = "Upload Image" }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <CloudUploadIcon fontSize="large" />
            &ensp;
            <Typography variant="h5">{title}</Typography>
        </Box>
    );
};

export default NoImage;
