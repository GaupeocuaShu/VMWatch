import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useState } from "react";
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}
export default function ShowSnackbar({ open, onClose, message = "success" }) {
    return (
        <div>
            <Snackbar
                open={open}
                onClose={onClose}
                TransitionComponent={SlideTransition}
                message={message}
                key={SlideTransition.name}
                autoHideDuration={1200}
            />
        </div>
    );
}
