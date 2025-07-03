import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TablePagination,
} from "@mui/material";
import axiosClient from "../../../axios-client";
import useFetchOrders from "../../../utils/hooks/orders/useFetchOrders";
import LoadingComponent from "../../../components/LoadingComponent";
import Error from "../../../components/Error";
import OrderStatus from "../../../components/OrderStatus";

const Order = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const { orders, setPage, loading, error } = useFetchOrders();
    if (loading) {
        return <LoadingComponent />;
    }
    if (error) {
        return <Error errorMessage={error} />;
    }
    return (
        <Box margin={matches ? "20px 200px" : "20px 20px"}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Order ID
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Total Amount
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Shipping Address
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Status
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            return (
                                <TableRow
                                    key={order.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.action.hover,
                                        },
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 600 }}>
                                        {order.id}
                                    </TableCell>
                                    <TableCell>${order.total_amount}</TableCell>
                                    <TableCell>
                                        {order.shipping_address}
                                    </TableCell>
                                    <TableCell>
                                        <OrderStatus status={order.status} />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            component={Link}
                                            to={`/orders/${order.id}`}
                                            color="secondary"
                                        >
                                            See Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Order;
