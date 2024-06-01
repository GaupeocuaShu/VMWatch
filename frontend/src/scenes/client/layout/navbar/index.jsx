import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
const navItems = [
    { name: "Brand", link: "/" },
    { name: "Male", link: "/" },
    { name: "Female", link: "/" },
    { name: "Couple", link: "/" },
    { name: "Item", link: "/" },
    { name: "Contact", link: "/" },
    { name: "News", link: "/" },
];
const Navbar = () => {
    return (
        <Box display="flex" justifyContent="space-around" margin="20px 200px">
            {navItems.map((e) => (
                <Link
                    style={{
                        textDecoration: "none",
                        color: "gray",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                    }}
                    to={e.link}
                    className="hover-underline"
                >
                    {e.name}
                </Link>
            ))}
        </Box>
    );
};

export default Navbar;
