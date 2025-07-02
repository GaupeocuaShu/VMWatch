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
const OrderDetail = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const { id: orderId } = useParams(); // Get order ID from URL parameters
    const [orderDetail, setOrderDetail] = useState(null);
    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const { data } = await axiosClient.get(`api/orders/${orderId}`);
                setOrderDetail(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrderDetail();
    }, [orderId]);

    if (!orderDetail) {
        return (
            <Box margin={matches ? "20px 200px" : "20px 20px"}>Loading...</Box>
        );
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
                <h2>Order Detail</h2>
            </Box>
            {/* Customer Information */}
            <Box mb={4}>
                <h3>Customer Information</h3>
                <Box>
                    <div>
                        <strong>Name:</strong> {name}
                    </div>
                    <div>
                        <strong>Email:</strong> {email}
                    </div>
                    <div>
                        <strong>Phone:</strong> {phone_number}
                    </div>
                </Box>
            </Box>
            {/* Shipping Address */}
            <Box mb={4}>
                <h3>Shipping Address</h3>
                <Box>
                    <div>{shipping_address}</div>
                    <div>
                        {shipping_city}, {shipping_state} {shipping_zip}
                    </div>
                    <div>{shipping_country}</div>
                </Box>
            </Box>
            {/* Order Items */}
            <Box mb={4}>
                <h3>Order Items</h3>
                <Box>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="order items table"
                    >
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
                                        <img
                                            src={item.watch.watch_thumb?.banner}
                                            alt={item.watch.name}
                                            style={{
                                                width: 100,
                                                height: 100,
                                                objectFit: "cover",
                                                borderRadius: 4,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/product/${item.watch.slug}`}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "primary.main",
                                                    "&:hover": {
                                                        color: "secondary.main",
                                                    },
                                                    transition:
                                                        "color 0.3s ease",
                                                }}
                                            >
                                                {item.watch.name}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        $
                                        {Number(item.watch.price || 0).toFixed(
                                            2
                                        )}
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        $
                                        {(
                                            Number(item.watch.price || 0) *
                                            Number(item.quantity || 0)
                                        ).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
            {/* Order Status */}
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Box>
                    <div>
                        <strong>Order Status:</strong> {status}
                    </div>
                    <div>
                        <strong>Payment Method:</strong> {paymentMethod}
                    </div>
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginTop: 8,
                        }}
                    >
                        Total: ${Number(totalAmount || 0).toFixed(2)}
                    </div>
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
