import React from 'react'
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

const useFetchWatchesBySearch = (query) => {
    const [page, setPage] = useState(1);
    const [watches, setWatches] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [notWatchesFound, setNotWatchesFound] = useState(false)
    useEffect(() => {
        const fetchWatches = async () => {
            setLoading(true);
            try {
                const { data } = await axiosClient.get("api/search-results", {
                    params: {
                        query,
                        page: page,
                    },
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
        if (!watches.length) {
            setNotWatchesFound(true);
        }
    }, [query, page]);
    return { watches, page, setPage, setWatches, loading, setLoading, error, notWatchesFound };
}

export default useFetchWatchesBySearch