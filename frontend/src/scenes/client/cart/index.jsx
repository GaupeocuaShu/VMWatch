import React from "react";
import {
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    Typography,
    TextField,
} from "@mui/material";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCart } from "../../../cart/cart";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import LineThroughTitle from "../../../components/LineThroughTitle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
const Cart = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const {
        cart,
        getCartTotal,
        increaseItemQuantity,
        decreaseItemQuantity,
        getCartQuantity,
        addToCart,
        removeFromCart,
    } = useCart((state) => ({
        cart: state.cart,
        getCartTotal: state.getCartTotal,
        getCartQuantity: state.getCartQuantity,
        addToCart: state.addToCart,
        increaseItemQuantity: state.increaseItemQuantity,
        decreaseItemQuantity: state.decreaseItemQuantity,
        removeFromCart: state.removeFromCart,
    }));
    console.log(cart);
    return (
        <Box
            margin={matches ? "20px 200px" : "20px 20px"}
            display="flex"
            gap={5}
        >
            <Paper
                sx={{
                    width: "70%",
                    padding: "20px",
                    margin: "20px auto",
                    borderRadius: "20px",
                }}
                elevation={5}
            >
                <Box my={2}>
                    {cart?.map((watch) => (
                        <Box
                            display="flex"
                            gap={2}
                            borderBottom="1px solid #CFCFCF"
                            alignItems="center"
                        >
                            <Box border="1px solid #CFCFCF" borderRadius="10px">
                                <img
                                    width="200"
                                    src={watch.front}
                                    alt={watch.name}
                                    sx={{ borderRadius: "10px" }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant="h4"
                                    fontWeight="bolder"
                                    color="gray"
                                    ml={2}
                                >
                                    {watch.brand}
                                    {watch.name} - Dial Size {watch.dialSize} -
                                    Glass Material {watch.glassMaterial} -{" "}
                                    {watch.gender}${watch.price}
                                    {watch.description}
                                </Typography>
                                <Box my={1} display="flex" alignItems="center">
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                            decreaseItemQuantity(watch.id)
                                        }
                                    >
                                        <RemoveCircleOutlineOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Typography variant="h5">
                                        {watch.quantity}
                                    </Typography>
                                    <IconButton
                                        aria-label="add"
                                        onClick={() =>
                                            increaseItemQuantity(watch.id)
                                        }
                                    >
                                        <ControlPointOutlinedIcon fontSize="large" />
                                    </IconButton>
                                    <Typography variant="h5">
                                        ${watch.total}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center">
                                    <Button
                                        color="secondary"
                                        aria-label="delete"
                                        startIcon={
                                            <DeleteForeverIcon fontSize="large" />
                                        }
                                        onClick={() => removeFromCart(watch.id)}
                                    >
                                        <Typography variant="h5">
                                            Remove
                                        </Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>

                <Divider />
                <Box my={2} display="flex" justifyContent="space-between">
                    <Typography variant="h5">Subtotal:</Typography>
                    <Typography variant="h5">${getCartTotal()}</Typography>
                </Box>
                <Divider />
                <Box my={2} display="flex" justifyContent="space-between">
                    <Typography variant="h4" fontWeight="bold">
                        Total:
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                        ${getCartTotal()}
                    </Typography>
                </Box>
                <Divider />
                {/* Customer Information */}
                <Box my={3}>
                    <LineThroughTitle
                        icon={<AccountBoxIcon fontSize="large" />}
                        title="Customer"
                        place="start"
                    />
                    <Box my={2}>
                        <Typography bgcolor="#EEECED" p={2} borderRadius={3}>
                            Hoang Vu My Tran
                        </Typography>
                        <Typography
                            my={2}
                            bgcolor="#EEECED"
                            p={2}
                            borderRadius={3}
                        >
                            tranhoangvumy22@gmail.com
                        </Typography>
                        <Typography bgcolor="#EEECED" p={2} borderRadius={3}>
                            7176788589
                        </Typography>
                    </Box>
                </Box>

                {/* Address Information */}
                <Box my={3}>
                    <LineThroughTitle
                        icon={<HomeIcon fontSize="large" />}
                        title="Address"
                        place="end"
                    />
                    <Box my={2}>
                        <Typography bgcolor="#EEECED" p={2} borderRadius={3}>
                            158 Huong Lo Ngoc Hiep
                        </Typography>
                        <Typography
                            my={2}
                            bgcolor="#EEECED"
                            p={2}
                            borderRadius={3}
                        >
                            Nha Trang - Khanh Hoa
                        </Typography>
                    </Box>
                </Box>

                {/* Payment Information */}
                <Box my={3}>
                    <LineThroughTitle
                        icon={<PaymentIcon fontSize="large" />}
                        title="Payment"
                        place="start"
                    />
                    <Box my={2}>
                        <Typography bgcolor="#EEECED" p={2} borderRadius={3}>
                            Pay directly
                        </Typography>
                    </Box>
                </Box>
                <Button
                    sx={{ my: "1rem" }}
                    fullWidth
                    variant="contained"
                    color="secondary"
                >
                    <Typography variant="h5" p={1}>
                        Purchase
                    </Typography>
                </Button>
            </Paper>
        </Box>
    );
};

export default Cart;
