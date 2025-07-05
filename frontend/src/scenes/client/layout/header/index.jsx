import React, { useEffect, useRef, useState } from "react";
import {
    Tooltip,
    Avatar,
    Box,
    InputBase,
    IconButton,
    Typography,
    Button,
    MenuItem,
    Menu,
    Badge,
    CircularProgress,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Logo from "../../../../components/Logo";
import { Link } from "react-router-dom";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import { useAuthContext } from "../../../../contexts/AuthContext";
import axiosClient from "../../../../axios-client";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navbar from "../navbar";
import { useCart } from "../../../../cart/cart";
import SearchResults from "../../search-results";
import WatchesFilter from "../../../../components/WatchesFilter";
import WatchList from "../../../../components/WatchList";
import useFetchWatches from "../../../../utils/hooks/watches/useFetchWatchs";
import useDebounce from "../../../../utils/hooks/watches/useDebounce";
import SeeMore from "../../../../components/SeeMore";
import LoadingComponent from "../../../../components/LoadingComponent";
// "Account", "Order", "Cart", "Log out"
const topSearches = [
    "Rolex",
    "Audemars Piguet",
    "Patek Philippe",
    "Daniel Wellington",
    "Hamilton",
];
const settings = [
    {
        name: "Orders",
        link: "/orders",
        icon: <WatchOutlinedIcon />,
    },
];
const Header = () => {
    // Responsive
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    //  Auth Context
    const { user, setUser } = useAuthContext();
    const handleLogOut = () => {
        axiosClient.post("/logout").then(() => {
            setUser(null);
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            await axiosClient
                .get("api/user")
                .then(({ data }) => {
                    setUser(data);
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchUser();
    }, []);

    // States
    const [notifications, setNotifications] = useState(
        "Search your favorite watches"
    );
    const [showPannelResult, setShowPannelResult] = useState(false);
    const [key, setKey] = useState("");
    const debouncedKey = useDebounce({ key, delay: 500 });
    const searchPannelRef = useRef(null);
    const turnOffPannelResult = () => {
        setShowPannelResult(false);
        setWatches([]); // Clear watches when closing the panel
        setKey(""); // Clear the search key
    };
    // Reset Watches when key is empty
    useEffect(() => {
        if (!key) {
            setWatches([]);
            setNotifications("Search your favorite watches");
        }
    }, [key]);
    // Close search panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchPannelRef.current &&
                !searchPannelRef.current.contains(event.target)
            ) {
                turnOffPannelResult();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { watches, setWatches, loading, setLoading, error, notWatchesFound } =
        useFetchWatches({
            key: debouncedKey,
            limit: 6,
        });

    return (
        <>
            <Box
                sx={{ paddingX: { md: "200px" } }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={5}
            >
                {/* Logo */}
                <Box>
                    <Logo isMobile={!matches} />
                </Box>
                {/* Search */}

                <Box flex={1} position="relative" ref={searchPannelRef}>
                    <Box
                        display="flex"
                        bgcolor="#f0f0f0"
                        borderRadius="5px"
                        height="40px"
                    >
                        <IconButton
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                            color="secondary"
                            LinkComponent={Link}
                            to={"/search-results?key=" + key}
                            disabled={
                                !key.trim() || loading || watches.length <= 3
                            }
                            onClick={() => turnOffPannelResult()}
                        >
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="search your favorite watchs"
                            inputProps={{
                                "aria-label": "search your favorite watchs",
                            }}
                            onChange={(e) => setKey(e.target.value)}
                            onClick={() => {
                                setShowPannelResult(true);
                                setLoading(false);
                            }}
                            value={key}
                        />
                    </Box>
                    {showPannelResult && (
                        <Box
                            position="absolute"
                            maxHeight="800px"
                            minHeight="300px"
                            overflow="auto"
                            width="100%"
                            zIndex={1000}
                            borderRadius={3}
                            p={2}
                            bgcolor="white"
                            sx={{ boxShadow: 2 }}
                        >
                            <Box display="flex" justifyContent="end">
                                <IconButton
                                    aria-label="delete"
                                    color="red"
                                    onClick={() => {
                                        turnOffPannelResult();
                                    }}
                                >
                                    <HighlightOffOutlinedIcon />
                                </IconButton>
                            </Box>
                            <Box>
                                {loading ? (
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight="300px"
                                    >
                                        <CircularProgress />

                                        <Typography ml={1}>
                                            Loading...
                                        </Typography>
                                    </Box>
                                ) : watches.length === 0 ? (
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        minHeight="300px"
                                    >
                                        <Typography>
                                            {notWatchesFound ? (
                                                <span
                                                    style={{
                                                        color: theme.palette
                                                            .secondary.main,
                                                    }}
                                                >
                                                    No results found
                                                </span>
                                            ) : (
                                                notifications
                                            )}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                        >
                                            <Typography pb={2}>
                                                Search Results for:{" "}
                                                <span style={{ color: "red" }}>
                                                    {key}
                                                </span>
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        <Box pt={2}>
                                            <WatchList
                                                watches={watches}
                                                forSearch={true}
                                            />
                                        </Box>
                                        <Divider />
                                        {watches && watches.length > 3 && (
                                            <Box mt={2} textAlign="center">
                                                <SeeMore
                                                    router={`/search-results?key=${key}`}
                                                    turnOffPannelResult={
                                                        turnOffPannelResult
                                                    }
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
                {/* User Information */}

                {/* Laptop */}
                <LaptopNavigation user={user} handleLogOut={handleLogOut} />

                {/* Mobile */}

                <MobileNavigation user={user} handleLogOut={handleLogOut} />
            </Box>
        </>
    );
};

export default Header;
// Laptop navigation
function LaptopNavigation({ user, handleLogOut }) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { getCartQuantity } = useCart((state) => ({
        getCartQuantity: state.getCartQuantity,
    }));
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            columnGap={4}
            sx={{ display: { xs: "none", md: "flex" } }}
        >
            {!user ? (
                <Button
                    LinkComponent={Link}
                    to="/login"
                    endIcon={<LoginOutlinedIcon />}
                    variant="contained"
                    color="secondary"
                >
                    Login
                </Button>
            ) : (
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Avatar" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem
                            key={0}
                            sx={{ width: "150px" }}
                            onClick={handleCloseUserMenu}
                        >
                            <Typography
                                textAlign="center"
                                fontWeight="bold"
                                ml={1}
                            >
                                {user && user?.name}
                            </Typography>
                        </MenuItem>
                        <Divider />

                        {settings.map((setting, key) => (
                            <MenuItem
                                sx={{ width: "150px" }}
                                key={key + 1}
                                component={Link}
                                to={setting.link}
                            >
                                {setting.icon}
                                <Typography textAlign="center" marginLeft={1}>
                                    {setting.name}
                                </Typography>
                            </MenuItem>
                        ))}
                        <Divider />

                        <MenuItem
                            key={settings.length + 1}
                            sx={{ width: "150px" }}
                            onClick={handleLogOut}
                        >
                            <LoginOutlinedIcon fontSize="sm" color="error" />

                            <Typography
                                sx={{ color: "#c70707" }}
                                textAlign="center"
                                marginLeft={1}
                            >
                                Log Out
                            </Typography>
                        </MenuItem>
                    </Menu>
                    &emsp;
                    <IconButton
                        color="secondary"
                        LinkComponent={Link}
                        to="/my-cart"
                    >
                        <Badge
                            badgeContent={getCartQuantity()}
                            color="secondary"
                        >
                            <ShoppingCartOutlinedIcon
                                sx={{ fontSize: "30px" }}
                            />
                        </Badge>
                    </IconButton>
                </Box>
            )}
        </Box>
    );
}
// Mobile navigation
function MobileNavigation({ user, handleLogOut }) {
    const [state, setState] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem key={0} disablePadding>
                    <ListItemButton
                        LinkComponent={Link}
                        to="/login"
                        endIcon={<LoginOutlinedIcon />}
                        variant="outlined"
                    >
                        {!user ? (
                            <ListItemText
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "500px",
                                }}
                                primary="Login"
                            />
                        ) : (
                            <ListItemText
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "500px",
                                }}
                                primary={user.name}
                            />
                        )}
                    </ListItemButton>
                </ListItem>
                <Divider />
                {settings.map((setting, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{setting.icon}</ListItemIcon>
                            <ListItemText primary={setting.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Navbar isMobile={true} />
            <Divider />
        </Box>
    );

    return (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)}>
                <ListOutlinedIcon fontSize="large" />
            </IconButton>
            <SwipeableDrawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list("right")}
            </SwipeableDrawer>
        </Box>
    );
}
