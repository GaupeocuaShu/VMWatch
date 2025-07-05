import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Filter from "../../../components/Filter";
import WatchesFilter from "../../../components/WatchesFilter";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import WatchSkeleton from "../../../components/WatchSkeleton";
import useQuery from "../../../utils/hooks/queries/useQuery";
import WatchList from "../../../components/WatchList";
import useFetchWatchesBySearch from "../../../utils/hooks/watches/useFetchWatchesBySearch";
import CustomPagination from "../../../components/Pagination";

const SearchResults = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [query, setQuery] = useState(useQuery());
    const { watches, page, setPage, loading, error, notWatchesFound } =
        useFetchWatchesBySearch(query);

    return (
        <>
            <Box
                margin={matches ? "20px 200px" : "20px 20px"}
                display="flex"
                gap={5}
            >
                <Filter query={query} setQuery={setQuery} />
                {loading ? (
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12,1fr)"
                        width="75%"
                        gap={4}
                    >
                        {Array.from({ length: 6 }, (_, index) => (
                            <WatchSkeleton key={index} />
                        ))}
                    </Box>
                ) : (
                    <>
                        <Box width="70%" gap={4}>
                            <Typography variant="h4" paddingY={2}>
                                Search Results for:{" "}
                                <span
                                    style={{
                                        color: theme.palette.secondary.main,
                                    }}
                                >
                                    {query.get("key")}
                                </span>
                            </Typography>
                            <Divider />

                            <Box paddingY={1}>
                                <WatchList watches={watches} forSearch={true} />
                            </Box>

                            <Divider />
                            <Box
                                display="flex"
                                justifyContent="center"
                                paddingY={2}
                            >
                                <CustomPagination
                                    setPage={setPage}
                                    page={page}
                                />
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default SearchResults;
