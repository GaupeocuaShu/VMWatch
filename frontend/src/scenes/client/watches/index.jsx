import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import useFetchWatches from "../../../utils/hooks/watches/useFetchWatchs";
import WatchList from "../../../components/WatchList";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import useQuery from "../../../utils/hooks/queries/useQuery";
import Error from "../../../components/Error";
import LoadingComponent from "../../../components/LoadingComponent";
import SeeMore from "../../../components/SeeMore";
import CustomPagination from "../../../components/Pagination";
const Watches = ({ title, watchType, limit = 8, isPagination = true }) => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const type = useQuery().get("type") || watchType;
    const { watches, loading, error } = useFetchWatches({ type, limit, page });
    if (loading) return <LoadingComponent />;
    if (error) return <Error errorMessage={error} />;
    return (
        <Box>
            <Box marginY={3}>
                <Typography
                    variant="h3"
                    textAlign="center"
                    textTransform="uppercase"
                    color="gray"
                    fontWeight={600}
                >
                    {title || "Best Seller Watches For " + type}
                </Typography>
            </Box>
            <WatchList watches={watches} limit={limit} />

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginY={3}
            >
                {" "}
                {isPagination ? (
                    <CustomPagination setPage={setPage} page={page} />
                ) : (
                    <SeeMore router={`/watches?type=${type}`} />
                )}
            </Box>
        </Box>
    );
};

export default Watches;
