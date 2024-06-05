import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import React from "react";
import { Link, useParams } from "react-router-dom";
const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { action } = useParams();
    console.log(action);
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box mb="30px">
                <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ mb: "5px" }}
                >
                    {title}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    {subtitle}
                </Typography>
            </Box>
            <Box>
                {action === "create" ? (
                    <Button
                        size="large"
                        variant="outlined"
                        color="green"
                        LinkComponent={Link}
                        to="/admin/team"
                    >
                        Back
                    </Button>
                ) : (
                    <Button
                        size="large"
                        variant="outlined"
                        color="green"
                        LinkComponent={Link}
                        to="/admin/team/create"
                    >
                        Create
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Header;
