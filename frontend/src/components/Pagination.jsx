import React from "react";
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ setPage, page }) => {
    return (
        <Pagination
            count={4}
            variant="filled"
            color="secondary"
            page={page}
            onChange={(event, value) => setPage(value)}
        />
    );
};

export default CustomPagination;
