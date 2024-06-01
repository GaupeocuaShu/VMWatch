import React from "react";
import { Box } from "@mui/material";
const Banner = () => {
    return (
        <Box>
            <img
                width="100%"
                style={{ objectFit: "cover" }}
                alt="Logo"
                src={`../../assets/KOI-Noble-PC.jpg`}
            />
        </Box>
    );
};

export default Banner;
