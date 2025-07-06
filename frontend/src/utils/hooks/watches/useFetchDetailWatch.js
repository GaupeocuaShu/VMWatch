import React from 'react'
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
const useFetchDetailWatch = ({ productSlug }) => {
    const [watch, setWatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchWatchBySlug = async () => {
            try {
                const { data } = await axiosClient.get(
                    `api/client/watches/${productSlug}`
                );
                setWatch(data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWatchBySlug();
    }, [productSlug]);

    return { watch, loading, error };
}

export default useFetchDetailWatch;


