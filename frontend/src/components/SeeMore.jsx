import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const SeeMore = ({ router }) => {
    return (
        <Button
            size="large"
            variant="contained"
            color="secondary"
            component={Link}
            to={`${router}`}
        >
            See More
        </Button>
    );
};

export default SeeMore;
