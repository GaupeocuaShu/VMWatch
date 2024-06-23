import React from "react";
import { Box } from "@mui/material";

const BrandCard = ({ alt, src }) => {
    return (
        <Box>
            <img
                width="90%"
                src={src}
                alt={alt}
                style={{ filter: "grayscale(100%)" }}
                className="hover-grayscale"
            />
        </Box>
    );
};

export default BrandCard;
