import React from "react";
import { Box } from "@mui/material";
const Banner = ({ src, alt, width = "100%", height = "100%" }) => {
    return (
        <Box overflow="hidden" bgcolor="#FCFCFC">
            <img width={width} height={height} alt={alt} src={src} />
        </Box>
    );
};

export default Banner;
