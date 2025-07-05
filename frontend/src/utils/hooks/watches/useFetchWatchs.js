import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function useFetchWatches({ type = null, key = null, limit = 8, page = 1 }) {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notWatchesFound, setNotWatchesFound] = useState(false);
    useEffect(() => {
        // Case 1 key is null means we don't want to search but still want to fetch watches
        // Case 2 key not empty string means we want to search by key
        if (key === null || key !== "") {
            setLoading(true);
            setError(null);
            const fetchWatches = async () => {
                try {
                    const { data } = await axiosClient.get("api/client/watches", {
                        params: {
                            type: type,
                            limit: limit,
                            page: page,
                            key: key,
                        },
                    });
                    setWatches(data.data);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchWatches();
            if (!watches.length) {
                setNotWatchesFound(true);
            }
        }
        // If key is empty string, we don't want to fetch watches
        else {
            setWatches([]);
            setLoading(false);
            setNotWatchesFound(false);
        }
        // Cleanup function to reset states
        return () => {
            setWatches([]);
            setLoading(true);
            setError(null);
            setNotWatchesFound(false);
        }
    }, [type, page, key]);

    return { watches, setWatches, loading, setLoading, error, notWatchesFound };
}

export default useFetchWatches;