import React, { useEffect } from "react";
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
            <Divider />
            <PopularBrand />
            <Divider />
            <PopularBrand type="high-end-swiss" title="High-end Swiss Brand" />
        </Box>
    );
};

export default Home;
