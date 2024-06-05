import React from "react";
import { Box } from "@mui/material";
const ThumbBanner = ({ src }) => {
    return (
        <Box overflow="hidden" borderRadius="5%">
            <img
                width="100%"
                style={{ objectFit: "cover" }}
                alt="Banner"
                src={src}
            />
        </Box>
    );
};

export default ThumbBanner;
