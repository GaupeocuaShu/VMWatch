import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
const Logo = ({ isMobile }) => {
    return (
        <Box component={Link} to="/">
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
