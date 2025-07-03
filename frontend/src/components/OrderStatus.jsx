import { Chip } from "@mui/material";
import React from "react";

const OrderStatus = ({ status }) => {
    let color;
    if (status === "pending") {
        color = "warning";
    } else if (status === "processing") {
        color = "info";
    } else if (status === "completed") {
        color = "success";
    } else if (status === "cancelled") {
        color = "error";
    }
    return (
        <Chip
            label={status}
            color={color}
            sx={{
                textTransform: "uppercase",
                fontSize: "0.6rem",
                fontWeight: "bold",
            }}
        />
    );
};

export default OrderStatus;
