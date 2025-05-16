import React from "react";
import { Box } from "@mui/material";
import Filter from "../../../components/Filter";
import WatchesFilter from "../../../components/WatchesFilter";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import WatchSkeleton from "../../../components/WatchSkeleton";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
const SearchResults = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [watches, setWatches] = useState([]);
    const [query, setQuery] = useState(useQuery());
    const [loading, setLoading] = useState(false);

    // Fetch Watches
    useEffect(() => {
        const fetchWatches = async () => {
            setLoading(true);
            try {
                const { data } = await axiosClient.get("api/search-results", {
                    params: query,
                });

                console.log(data.data);
                setWatches(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (query) fetchWatches();
    }, [query]);
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
                        width="80%"
                        gap={4}
                    >
                        {Array.from({ length: 10 }, (_, index) => (
                            <WatchSkeleton key={index} />
                        ))}
                    </Box>
                ) : (
                    <WatchesFilter watches={watches} />
                )}
            </Box>
        </>
    );
};

export default SearchResults;
