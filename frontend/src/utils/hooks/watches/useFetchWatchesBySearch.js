import React from 'react'
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

const useFetchWatchesBySearch = (query) => {
    console.log("Query:", query);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [watches, setWatches] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [notWatchesFound, setNotWatchesFound] = useState(false)

    useEffect(() => {
        const fetchWatches = async () => {
            setLoading(true);
            setError(null);
            setNotWatchesFound(false);

            try {
                // Convert URLSearchParams to object if needed
                let queryParams = {};
                if (query instanceof URLSearchParams) {
                    for (let [key, value] of query.entries()) {
                        queryParams[key] = value;
                    }
                } else {
                    queryParams = query || {};
                }

                const { data } = await axiosClient.get("api/search-results", {
                    params: {
                        ...queryParams,
                        page: page,
                    },
                });

                setWatches(data.data);
                setTotal(data.meta.total); // Assuming the API returns total count of watches
                if (!data.data || data.data.length === 0) {
                    setNotWatchesFound(true);
                }

            } catch (error) {
                console.log(error);
                setError(error);
                setWatches([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchWatches();
        }
    }, [query, page]);
    return { watches, total, page, setPage, setWatches, loading, setLoading, error, notWatchesFound };
}

export default useFetchWatchesBySearch