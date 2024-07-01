import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
export default function WatchSkeleton() {
    return (
        <Box gridColumn="span 4">
            <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={250}
            />

            <Skeleton
                animation="wave"
                variant="text"
                height={60}
                width="100%"
            />
            <Skeleton animation="wave" variant="text" width="100%" />
            <Skeleton animation="wave" variant="text" width="80%" />
        </Box>
    );
}
