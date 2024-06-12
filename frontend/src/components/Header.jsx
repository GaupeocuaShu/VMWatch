import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
const Header = ({ title, subtitle, action = "index", router = "user" }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
                {action === "index" ? (
                    <Button
                        size="large"
                        variant="outlined"
                        color="green"
                        LinkComponent={Link}
                        to={`/admin/${router}/create`}
                        endIcon={<AddCircleOutlinedIcon />}
                    >
                        Create
                    </Button>
                ) : (
                    <Button
                        size="large"
                        variant="outlined"
                        color="green"
                        LinkComponent={Link}
                        to={`/admin/${router}`}
                        endIcon={<ReplyAllOutlinedIcon />}
                    >
                        Back
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Header;
