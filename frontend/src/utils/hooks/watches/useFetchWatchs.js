import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function useFetchWatches({ type = null, key = null, limit = 8, page = 1 }) {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, [type, page, key]);

    return { watches, loading, error };
}

export default useFetchWatches;