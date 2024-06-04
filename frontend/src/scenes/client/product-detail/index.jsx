import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Breadcrumb from "../../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { watches } from "../../../constants/index";
import ProductDetailGallery from "../../../components/ProductDetailGallery";
const exampleWatch = watches[0];
const ProductDetail = () => {
    const { productSlug } = useParams();
    console.log(productSlug);
    return (
        <Box margin="20px 200px">
            <Breadcrumb />

            <Box>
                <ProductDetailGallery />
            </Box>
            <Box display="flex" my={8}>
                <Box>
                    <Typography variant="h2" textTransform="uppercase">
                        {exampleWatch.brand}
                    </Typography>
                    <Typography variant="h3">
                        {exampleWatch.name} - {exampleWatch.dial} -{" "}
                        {exampleWatch.crystal} - {exampleWatch.gender}
                    </Typography>
                    <Typography variant="h2" color="secondary">
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
                        <Typography variant="h3">Add To Cart</Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
