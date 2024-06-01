import React from "react";
import { Box, Divider } from "@mui/material";
import Banner from "../../../components/Banner";
import BannerGallery from "../../../components/BannerGallery";
import Collection from "../../../components/Collection";
import SwiperBanner from "../../../components/SwiperBanner";
const Home = () => {
    return (
        <Box>
            <SwiperBanner />
            <BannerGallery />
            <Collection />
            <Divider />
        </Box>
    );
};

export default Home;
