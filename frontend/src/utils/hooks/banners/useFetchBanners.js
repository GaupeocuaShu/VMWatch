import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

function useFetchBanners() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axiosClient.get("api/client/banners");
                setBanners(data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    return { banners, loading, error };
}

export default useFetchBanners;