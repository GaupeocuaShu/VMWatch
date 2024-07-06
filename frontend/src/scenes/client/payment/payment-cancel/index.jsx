import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
const PaymentCancel = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <Box
            margin={matches ? "20px 200px" : "20px 20px"}
            display="flex"
            gap={5}
        >
            PaymentCancel
        </Box>
    );
};

export default PaymentCancel;
