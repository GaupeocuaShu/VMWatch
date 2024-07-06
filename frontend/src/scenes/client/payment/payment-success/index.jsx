import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
const PaymentSuccess = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    useEffect(() => {}, []);
    return (
        <Box
            margin={matches ? "20px 200px" : "20px 20px"}
            display="flex"
            gap={5}
        >
            PaymentSuccess
        </Box>
    );
};

export default PaymentSuccess;
