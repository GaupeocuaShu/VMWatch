import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function useFetchWatches({ type = null }) {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatches = async () => {
            try {
                const { data } = await axiosClient.get("api/client/watches", {
                    params: {
                        type: type,
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
    }, [type]);

    return { watches, loading, error };
}

export default useFetchWatches;