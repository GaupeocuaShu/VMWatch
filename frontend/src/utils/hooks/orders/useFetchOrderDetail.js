import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function useFetchOrderDetail({ orderId }) {
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axiosClient.get(`api/orders/${orderId}`);
                setOrderDetail(data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [orderId]);

    return { orderDetail, loading, error };
}

export default useFetchOrderDetail;