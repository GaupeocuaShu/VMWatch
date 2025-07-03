import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function useFetchOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axiosClient.get(
                    "api/orders?page=" + page
                );
                setOrders(data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [page]);

    return { orders, setPage, loading, error };
}

export default useFetchOrders;