import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axiosClient from "../axios-client";
import BrandCard from "./BrandCard";
const PopularBrand = ({ title = "Famous Brands", type = "famous" }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axiosClient.get("api/get-brands");
                console.log(data.data);
                const brands = data.data.filter((e) => e.type === type);
                setBrands(brands);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBrands();
    }, []);
    console.log(brands);
    return (
        <Box margin={matches ? "20px 200px" : "20px 20px"}>
            <Typography
                variant="h3"
                textAlign="center"
                textTransform="uppercase"
                color="gray"
                fontWeight={600}
            >
                {title}
            </Typography>
            <Box
                my={5}
                gap={matches ? 2 : 0}
                display="grid"
                gridTemplateColumns="repeat(12,2fr)"
            >
                {brands.map((e) => (
                    <Box
                        gridColumn={matches ? "span 2" : "span 6"}
                        sx={{ cursor: "pointer" }}
                    >
                        <BrandCard alt={e.name} src={e.banner} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PopularBrand;
