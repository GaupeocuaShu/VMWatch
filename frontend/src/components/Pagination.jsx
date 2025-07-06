import React from "react";
import Pagination from "@mui/material/Pagination";

const CustomPagination = ({ total, limit = 8, setPage, page }) => {
    return (
        <Pagination
            count={Math.ceil(total / limit)}
            variant="filled"
            color="secondary"
            page={page}
            onChange={(event, value) => setPage(value)}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
    );
};

export default CustomPagination;
