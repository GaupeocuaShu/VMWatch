import React, { useEffect, useState } from "react";
import { Box, Divider, useTheme } from "@mui/material";
import Banner from "../../../components/Banner";
import BannerGallery from "../../../components/BannerGallery";
import Collection from "../../../components/Collection";
import SwiperBanner from "../../../components/SwiperBanner";
import WatchList from "../../../components/WatchList";
import { watches } from "../../../constants/index";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import BrandCard from "../../../components/BrandCard";
import PopularBrand from "../../../components/PopularBrand";
import axiosClient from "../../../axios-client";
import { Helmet } from "react-helmet-async";
import { useCart } from "../../../cart/cart";

const Home = () => {
    const [watches, setWatches] = useState([]);
    const [brands, setBrands] = useState([]);
    const [banners, setBanners] = useState([]);

    // Fetch Banner
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axiosClient.get("api/get-banners");

                setBanners(data.data.sort((a, b) => a.serial - b.serial));
            } catch (error) {
                console.log(error);
            }
        };
        fetchBanners();
    }, []);

    // Fetch Watches
    useEffect(() => {
        const fetchWatches = async () => {
            try {
                const { data } = await axiosClient.get(
                    "api/get-display-watches"
                );

                console.log(data.data);
                setWatches(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWatches();
    }, []);

    // Fetch Brands
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axiosClient.get("api/get-brands");
                console.log();
                setBrands(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBrands();
    }, []);
    return (
        <Box>
            <Helmet>
                <title>VM Watch</title>
                <meta
                    name="description"
                    content="Credibility - Responsibility - Promptness"
                />
            </Helmet>
            <SwiperBanner banners={banners} />
            <BannerGallery />
            <Collection />
            <Divider />
            <WatchList gender="male" watches={watches} />
            <Divider />
            <WatchList gender="female" watches={watches} />
            <Divider />
            <PopularBrand brands={brands} />
            <Divider />
            <PopularBrand
                brands={brands}
                type="high-end-swiss"
                title="High-end Swiss Brand"
            />
        </Box>
    );
};

export default Home;
