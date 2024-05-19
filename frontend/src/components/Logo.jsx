import React from "react";
import { Box } from "@mui/material";
const Logo = ({ isMobile }) => {
    return (
        <Box>
            <img
                alt="Logo"
                src={`../../assets/user-avatar.png`}
                width={isMobile ? "50" : "100"}
                height={isMobile ? "50" : "100"}
            />
        </Box>
    );
};

export default Logo;
