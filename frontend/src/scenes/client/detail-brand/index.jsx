import React from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Breadcrumb from "../../../components/Breadcrumb";
import { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
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
        <Box margin={matches ? "20px 200px" : "20px 20px"}>
            <Helmet>
                <title>{brand?.meta_title}</title>
                <meta name="description" content={brand?.meta_description} />
            </Helmet>

            <Breadcrumb />
            <Box></Box>
        </Box>
    );
};

export default DetailBrand;
