import React from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { watches } from "../../../constants/index";
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
const exampleWatch = watches[0];
const ProductDetail = () => {
    const { productSlug } = useParams();
    console.log(productSlug);
    return (
        <Box margin="20px 200px">
            <Breadcrumb />

            <Box
                display="grid"
                gap={5}
                gridTemplateColumns="repeat(2,1fr)"
                my={8}
            >
                <Box>
                    <ProductDetailGallery />
                </Box>
                <Box display="flex" gap={2} flexDirection="column">
                    <Typography variant="h2" textTransform="uppercase">
                        {exampleWatch.brand}
                    </Typography>
                    <Typography variant="h3">
                        {exampleWatch.name} - {exampleWatch.dial} -{" "}
                        {exampleWatch.crystal} - {exampleWatch.gender}
                    </Typography>
                    <Typography variant="h1" color="secondary">
                        {exampleWatch.price}
                    </Typography>
                    <Typography>
                        Citizen Tsuyosa NJ0154-80H kích thước 40mm, kết hợp cùng
                        dây đeo kim loại dây mạ vàng demi phong cách thời trang
                        sang trọng. Trang bị bộ máy cơ Miyota Nhật Bản tích cót
                        khoảng 40 giờ bền bỉ.
                    </Typography>
                    <Button
                        sx={{ my: "1rem" }}
                        fullWidth
                        variant="contained"
                        color="secondary"
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

            <Gurantees />
            <Box my={8} sx={{ fontSize: "large" }}>
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
                                {exampleWatch.brand}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    name:&emsp;
                                </span>
                                {exampleWatch.name}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    crystal:&emsp;
                                </span>
                                {exampleWatch.crystal}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    dial:&emsp;
                                </span>
                                {exampleWatch.dial}
                            </li>
                            <li>
                                <span style={{ fontWeight: "bolder" }}>
                                    gender:&emsp;
                                </span>
                                {exampleWatch.gender}
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
