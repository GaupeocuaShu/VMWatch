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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
    );
};

export default CustomPagination;
