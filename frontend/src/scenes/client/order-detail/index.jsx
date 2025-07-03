import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import axiosClient from "../../../axios-client";
import LoadingComponent from "../../../components/LoadingComponent";
import useFetchOrderDetail from "../../../utils/hooks/orders/useFetchOrderDetail";
import Error from "../../../components/Error";
import OrderStatus from "../../../components/OrderStatus";
const OrderDetail = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const { id: orderId } = useParams(); // Get order ID from URL parameters
    const { orderDetail, loading, error } = useFetchOrderDetail({ orderId });

    if (loading) {
        return <LoadingComponent />;
    }
    if (error) {
        return <Error errorMessage={error} />;
    }
    const {
        items = [],
        user: { name, email },
        phone_number,
        total_amount: totalAmount,
        shipping_address,
        shipping_zip,
        shipping_city,
        shipping_state,
        shipping_country,
        status,
        payment_method: paymentMethod,
    } = orderDetail;
    return (
        <Box margin={matches ? "20px 200px" : "20px 20px"}>
            <Button
                variant="contained"
                component={Link}
                to="/orders"
                sx={{ mb: 2 }}
                color="secondary"
            >
                Back
            </Button>
            <Box mb={4}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Order Detail
                </Typography>
            </Box>
            {/* Customer Information */}
            <Box mb={4}>
                <Typography variant="h3" component="h3" gutterBottom>
                    Customer Information
                </Typography>
                <Box>
                    <Typography>
                        <Box component="span" fontWeight="fontWeightBold">
                            Name:
                        </Box>{" "}
                        {name}
                    </Typography>
                    <Typography>
                        <Box component="span" fontWeight="fontWeightBold">
                            Email:
                        </Box>{" "}
                        {email}
                    </Typography>
                    <Typography>
                        <Box component="span" fontWeight="fontWeightBold">
                            Phone:
                        </Box>{" "}
                        {phone_number}
                    </Typography>
                </Box>
            </Box>
            {/* Shipping Address */}
            <Box mb={4}>
                <Typography variant="h3" component="h3" gutterBottom>
                    Shipping Address
                </Typography>
                <Box>
                    <Typography>{shipping_address}</Typography>
                    <Typography>
                        {shipping_city}, {shipping_state} {shipping_zip}
                    </Typography>
                    <Typography>{shipping_country}</Typography>
                </Box>
            </Box>
            {/* Order Items */}
            <Box mb={4}>
                <Typography variant="h3" component="h3" gutterBottom>
                    Order Items
                </Typography>
                <Table sx={{ minWidth: 650 }} aria-label="order items table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Image
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Product
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Unit Price
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Quantity
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={item.watch.watch_thumb?.banner}
                                        alt={item.watch.name}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            objectFit: "cover",
                                            borderRadius: 1,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/product/${item.watch.slug}`}
                                        sx={{
                                            color: "primary.main",
                                            textTransform: "none",
                                            "&:hover": {
                                                color: "secondary.main",
                                                background: "transparent",
                                            },
                                            p: 0,
                                            minWidth: 0,
                                        }}
                                    >
                                        <Typography variant="body1">
                                            {item.watch.name}
                                        </Typography>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        $
                                        {Number(item.watch.price || 0).toFixed(
                                            2
                                        )}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {item.quantity}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        $
                                        {(
                                            Number(item.watch.price || 0) *
                                            Number(item.quantity || 0)
                                        ).toFixed(2)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            {/* Order Status */}
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Box>
                    <Typography variant="h5" component="h5" gutterBottom>
                        <Box component="span" fontWeight="fontWeightBold">
                            Order Status:
                        </Box>{" "}
                        <OrderStatus status={status} />
                    </Typography>
                    <Typography variant="h5" component="h5" gutterBottom>
                        <Box component="span" fontWeight="fontWeightBold">
                            Payment Method:
                        </Box>{" "}
                        {paymentMethod}
                    </Typography>
                    <Typography variant="h5" component="h5" gutterBottom>
                        Total: ${Number(totalAmount || 0).toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            <Button
                variant="contained"
                component={Link}
                to="/orders"
                sx={{ mb: 2 }}
                color="secondary"
            >
                Back
            </Button>
        </Box>
    );
};

export default OrderDetail;
