import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Box, Typography } from "@mui/material";

// Custom style for CardElement to match Material UI look
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#000",
            fontSize: "16px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            "::placeholder": {
                color: "#9e9e9e",
            },
        },
        invalid: {
            color: "#f44336",
        },
    },
};

export default function StripeCardInput({ error }) {
    return (
        <Box
            sx={{
                border: `1px solid ${error ? "#f44336" : "#c4c4c4"}`,
                borderRadius: "4px",
                padding: "12px 14px",
                mt: 2,
                transition: "border-color 0.3s",
            }}
        >
            <Typography variant="body2" sx={{ mb: 1, color: "#616161" }}>
                Card Information
            </Typography>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            {error && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 1, display: "block" }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
}
