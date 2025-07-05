import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumb from "../../../components/Breadcrumb";
import { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
import SwiperBanner from "../../../components/SwiperBanner";
import LineThroughTitle from "../../../components/LineThroughTitle";
import Filter from "../../../components/Filter";
import WatchList from "../../../components/WatchList";
import WatchesFilter from "../../../components/WatchesFilter";
import useFetchDetailBrand from "../../../utils/hooks/brands/useFetchDetailBrand";
import useFetchWatches from "../../../utils/hooks/watches/useFetchWatchs";
import LoadingComponent from "../../../components/LoadingComponent";
import Error from "../../../components/Error";
const DetailBrand = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const { brandSlug } = useParams();
    const {
        brand,
        loading: brandLoading,
        error: brandError,
    } = useFetchDetailBrand();
    const {
        watches,
        loading: watchesLoading,
        error: watchesError,
    } = useFetchWatches({ brand: brandSlug });
    if (brandLoading || watchesLoading) return <LoadingComponent />;
    if (brandError || watchesError)
        return <Error errorMessage={brandError || watchesError} />;
    return (
        brand && (
            <>
                <Box margin={matches ? "20px 200px" : "20px 20px"}>
                    <Helmet>
                        <title>{brand?.meta_title}</title>
                        <meta
                            name="description"
                            content={brand?.meta_description}
                        />
                    </Helmet>

                    <Breadcrumb />
                    <Box>
                        <Typography
                            variant="h4"
                            color="gray"
                            fontWeight={700}
                            textAlign="center"
                            my={3}
                        >
                            {brand?.title}
                        </Typography>

                        <Box>
                            <SwiperBanner banners={brand.banners} />
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" color="gray" my={3}>
                            {brand.description}
                        </Typography>
                    </Box>
                    <LineThroughTitle title="Collections" />

                    <Box
                        my={2}
                        gap={4}
                        display="grid"
                        gridTemplateColumns="repeat(3,1fr)"
                    >
                        {brand?.collections?.map((c) => (
                            <Collection collection={c} />
                        ))}
                    </Box>

                    <LineThroughTitle title="Choose Your Style" />
                </Box>
                {watchesLoading ? (
                    <LoadingComponent />
                ) : watchesError ? (
                    <Error errorMessage={watchesError} />
                ) : (
                    <WatchList watches={watches} />
                )}
            </>
        )
    );
};

export default DetailBrand;

const Collection = ({ collection }) => {
    return (
        <Box sx={{ cursor: "pointer" }}>
            <img width="100%" src={collection.banner} alt={collection.name} />
        </Box>
    );
};
