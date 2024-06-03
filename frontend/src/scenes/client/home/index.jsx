import React from "react";
import { Box, Divider } from "@mui/material";
import Banner from "../../../components/Banner";
import BannerGallery from "../../../components/BannerGallery";
import Collection from "../../../components/Collection";
import SwiperBanner from "../../../components/SwiperBanner";
import WatchList from "../../../components/WatchList";
import { watches } from "../../../constants/index";
const Home = () => {
    return (
        <Box>
            <SwiperBanner />
            <BannerGallery />
            <Collection />
            <Divider />
            <WatchList gender="male" watches={watches} />
            <Divider />
            <WatchList gender="female" watches={watches} />
        </Box>
    );
};

export default Home;
