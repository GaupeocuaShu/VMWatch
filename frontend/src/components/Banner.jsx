import React from "react";
import { Box } from "@mui/material";
const Banner = ({ src, alt }) => {
    return (
        <Box overflow="hidden">
            <img
                width="100%"
                height="400px"
                style={{ objectFit: "cover" }}
                alt={alt}
                src={src}
            />
        </Box>
    );
};

export default Banner;
