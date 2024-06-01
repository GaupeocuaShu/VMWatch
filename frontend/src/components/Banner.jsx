import React from "react";
import { Box } from "@mui/material";
const Banner = ({ src }) => {
    return (
        <Box overflow="hidden">
            <img
                width="100%"
                height="400px"
                style={{ objectFit: "contain" }}
                alt="Banner"
                src={src}
            />
        </Box>
    );
};

export default Banner;
