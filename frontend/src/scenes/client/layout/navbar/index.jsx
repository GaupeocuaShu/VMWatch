import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
const navItems = [
    { name: "Brand", link: "/" },
    { name: "Male", link: "/" },
    { name: "Female", link: "/" },
    { name: "Couple", link: "/" },
    { name: "Item", link: "/" },
    { name: "Contact", link: "/" },
    { name: "News", link: "/" },
];
const Navbar = ({ isMobile = false }) => {
    // const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box
            display="flex"
            flexDirection={!isMobile ? "row" : "column"}
            justifyContent="space-around"
            margin={!isMobile && "20px 200px"}
        >
            {!isMobile
                ? navItems.map((e) => (
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
                  ))
                : navItems.map((e, index) => (
                      <List>
                          <ListItem key={index} disablePadding>
                              <ListItemButton>
                                  <ListItemText primary={e.name} />
                              </ListItemButton>
                          </ListItem>
                      </List>
                  ))}
        </Box>
    );
};

export default Navbar;
