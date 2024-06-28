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
const DetailBrand = () => {
    const [brand, setBrand] = useState({});
    const { brandSlug } = useParams();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    useEffect(() => {
        const fetchBrandBySlug = async () => {
            const { data } = await axiosClient.get(
                `api/get-detail-brand/${brandSlug}`
            );
            console.log(data.data);
            setBrand(data.data);
        };
        fetchBrandBySlug();
    }, []);
    return (
        brand && (
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
                        variant="h3"
                        color="gray"
                        fontWeight="bold"
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

                <Divider />
                <LineThroughTitle title="Choose Your Style" />

                <Filter />
            </Box>
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
