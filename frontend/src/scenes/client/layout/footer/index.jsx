import React from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../../../components/Logo";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
const footerLinks = [
    { title: "policy", links: ["return policy", "warranty policy"] },
    {
        title: "information",
        links: [
            "Contact Information",
            "Payment - Installment",
            "Business Partner Contact",
            "Shipping & Delivery",
        ],
    },
    {
        title: "Reference",
        links: [
            " Terms of Use",
            "Information Privacy",
            "Warranty Watch Lookup",
        ],
    },
];
const Footer = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [expanded, setExpanded] = React.useState(false);
    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    return (
        <Box
            margin={matches ? "20px 200px" : "20px 20px"}
            boxSizing="border-box"
            display="flex"
            flexDirection={matches ? "row" : "column"}
            gap={5}
        >
            <Box>
                <Logo />
            </Box>
            {matches ? (
                <Box flex={1}>
                    <ul
                        style={{
                            display: "flex",
                            textTransform: "uppercase",
                            listStyleType: "none",
                            columnGap: "5rem",
                        }}
                    >
                        {footerLinks.map((e, i) => (
                            <li>
                                <Typography variant="h4" color="secondary">
                                    {e.title}
                                </Typography>
                                <List>
                                    {e.links.map((link) => (
                                        <ListItem disablePadding>
                                            <ListItemButton color="secondary">
                                                <ListItemText primary={link} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </li>
                        ))}
                    </ul>
                </Box>
            ) : (
                <Box>
                    {footerLinks.map((e, i) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                {e.title}
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {e.links.map((link) => (
                                        <ListItem disablePadding>
                                            <ListItemButton color="secondary">
                                                <ListItemText primary={link} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Footer;
