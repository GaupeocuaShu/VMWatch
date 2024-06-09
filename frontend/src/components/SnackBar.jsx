import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import { Alert } from "@mui/material";
function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}
export default function ShowSnackbar({
    open,
    onClose,
    message = "success",
    severity,
}) {
    return (
        <div>
            <Snackbar
                open={open}
                onClose={onClose}
                TransitionComponent={SlideTransition}
                key={SlideTransition.name}
                autoHideDuration={1800}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={onClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: "300px", fontSize: "medium" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
