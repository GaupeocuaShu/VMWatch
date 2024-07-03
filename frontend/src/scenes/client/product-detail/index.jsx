import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import ProductDetailGallery from "../../../components/ProductDetailGallery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Gurantees from "../../../components/Gurantees";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import axiosClient from "../../../axios-client";
import { Helmet } from "react-helmet-async";
import { useCart } from "../../../cart/cart";

const ProductDetail = () => {
    const { productSlug } = useParams();
    const [watch, setWatch] = useState({});
    const {
        cart,
        getCartTotal,
        increaseItemQuantity,
        decreaseItemQuantity,
        getCartQuantity,
        addToCart,
    } = useCart((state) => ({
        cart: state.cart,
        getCartTotal: state.getCartTotal,
        getCartQuantity: state.getCartQuantity,
        addToCart: state.addToCart,
        increaseItemQuantity: state.increaseItemQuantity,
        decreaseItemQuantity: state.decreaseItemQuantity,
    }));
    useEffect(() => {
        const fetchWatchBySlug = async () => {
            const { data } = await axiosClient.get(
                `api/get-detail-watches/${productSlug}`
            );
            console.log(data.data);
            setWatch(data.data);
        };
        fetchWatchBySlug();
    }, []);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    console.log(cart);
    console.log(getCartQuantity() + " " + getCartTotal());

    return (
        <Box margin={matches ? "20px 200px" : "20px 20px"}>
            <Helmet>
                <title>{watch?.meta_title}</title>
                <meta name="description" content={watch?.meta_description} />
            </Helmet>

            <Breadcrumb />
            <Box
                display="grid"
                gap={5}
                gridTemplateColumns={matches && "repeat(2,1fr)"}
                my={8}
            >
                <Box>
                    <ProductDetailGallery galleries={watch.galleries} />
                </Box>
                <Box
                    display="flex"
                    gap={2}
                    flexDirection="column"
                    textTransform="capitalize"
                >
                    <Typography variant="h2" textTransform="uppercase">
                        {watch.brand}
                    </Typography>
                    <Typography variant="h3">
                        {watch.name} - Dial Size {watch.dialSize} - Glass
                        Material {watch.glassMaterial} - {watch.gender}
                    </Typography>
                    <Typography variant="h1" color="secondary">
                        ${watch.price}
                    </Typography>
                    <Typography>{watch.description}</Typography>

                    <Button
                        sx={{ my: "1rem" }}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => addToCart(watch)}
                    >
                        <Typography variant="h4" p={1}>
                            Add To Cart
                        </Typography>
                    </Button>
                    <Box bgcolor="#EDEDED" borderRadius={3}>
                        <List
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                            }}
                        >
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BeachAccessIcon color="secondary" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Free gift wrapping service when purchasing in-store." />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon color="secondary" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="When using Home PayLater for payment at Hai Trieu:"
                                    secondary="
                                    50% discount, maximum 100K VND, for orders from 200K VND
                                    5% discount, maximum 500K VND"
                                />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Box>
            <Gurantees matches={matches} />
            <Box my={8} sx={{ fontSize: "large" }} textTransform="capitalize">
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <NewspaperIcon fontSize="large" color="secondary" />
                        &emsp;
                        <Typography variant="h3" color="secondary">
                            Product Information
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        }}
                    >
                        <ul style={{ listStyle: "none", lineHeight: "3rem" }}>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Brand: &emsp;
                                </span>
                                {watch.brand}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Origin: &emsp;
                                </span>
                                {watch.origin}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Name:&emsp;
                                </span>
                                {watch.name}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Collection:&emsp;
                                </span>
                                {watch.watchCollection}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Glass Material:&emsp;
                                </span>
                                {watch.glassMaterial}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Dial Size:&emsp;
                                </span>
                                {watch.dialSize}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Dial Shape:&emsp;
                                </span>
                                {watch.dialShape}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Dial Color:&emsp;
                                </span>
                                {watch.dialColor}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Case Color:&emsp;
                                </span>
                                {watch.caseColor}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Energy:&emsp;
                                </span>
                                {watch.energy}
                            </li>

                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Gender:&emsp;
                                </span>
                                {watch.gender}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Features:&emsp;
                                </span>
                                {watch?.features?.map((e, i) =>
                                    i === watch.features.length - 1
                                        ? e.name
                                        : e.name + ", "
                                )}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Water Resistance Levels:&emsp;
                                </span>
                                {watch.waterResistanceLevels} ATM
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Weight:&emsp;
                                </span>
                                {watch.weight}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    Warranty:&emsp;
                                </span>
                                {watch.warranty} years
                            </li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <PolicyOutlinedIcon
                            fontSize="large"
                            color="secondary"
                        />
                        &emsp;
                        <Typography variant="h3" color="secondary">
                            Transport Policy
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            <li>Nationwide fast delivery.</li>
                            <li>
                                Express delivery within 2 hours in: Ho Chi Minh
                                City, Hanoi, Bien Hoa, Vung Tau, Binh Duong, Da
                                Nang.
                            </li>
                            <li>
                                Delivery to suburban areas: 2-3 days (may take
                                up to 7 days depending on the region).
                            </li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <LocalShippingOutlinedIcon
                            fontSize="large"
                            color="secondary"
                        />
                        &emsp;
                        <Typography variant="h3" color="secondary">
                            Warranty Policy
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            <li>Free lifetime battery replacement.</li>
                            <li>Up to 5 years warranty on the machine.</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default ProductDetail;
