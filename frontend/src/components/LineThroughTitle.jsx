import React from "react";
import { Box, Typography } from "@mui/material";
const LineThroughTitle = ({ title }) => {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Box border="1px solid #D8D8D8" height={1} flex={1}></Box>
            <Typography
                variant="h3"
                color="gray"
                fontWeight="bold"
                textAlign="center"
                my={3}
            >
                {title}
            </Typography>
            <Box border="1px solid #D8D8D8" height={1} flex={1}></Box>
        </Box>
    );
};

export default LineThroughTitle;
