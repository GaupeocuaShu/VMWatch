import React from "react";
import { Box, Typography } from "@mui/material";
const LineThroughTitle = ({ title, place = "center", icon = "" }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box border="1px solid #D8D8D8" height={1} flex={1} order={1}></Box>
            <Typography
                variant="h4"
                color="gray"
                fontWeight="bold"
                textAlign="center"
                order={place === "start" ? 0 : place === "end" ? 4 : 2}
                ml={place === "start" ? 0 : 3}
                mr={place === "end" ? 0 : 3}
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
                {icon}
                {title}
            </Typography>
            <Box border="1px solid #D8D8D8" height={1} flex={1} order={3}></Box>
        </Box>
    );
};

export default LineThroughTitle;
