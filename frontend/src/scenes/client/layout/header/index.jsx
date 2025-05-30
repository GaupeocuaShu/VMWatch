import React, { useEffect, useState } from "react";
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
        name: "Profile",
        link: "/profile",
        icon: <PersonOutlinedIcon />,
    },
    {
        name: "Order",
        link: "/order",
        icon: <WatchOutlinedIcon />,
    },
];
const Header = () => {
    const { user, setUser } = useAuthContext();
    const [watches, setWatches] = useState([]);
    const [showPannelResult, setShowPannelResult] = useState(false);
    const [query, setQuery] = useState("");
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    console.log(matches);
    console.log(query);
    const handleLogOut = () => {
        axiosClient.post("/logout").then(() => {
            setUser(null);
        });
    };

    // Fetch Searching-Watching
    useEffect(() => {
        const fetchSearch = async () => {
            try {
                if (query) {
                    const { data } = await axiosClient.get(
                        "/api/search/" + query
                    );

                    setWatches(data.data);
                } else {
                    setWatches([]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchSearch();
    }, [query]);

    // Fetch User
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

                <Box flex={1} position="relative">
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
                            to="/search-results"
                        >
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="search your favorite watchs"
                            inputProps={{
                                "aria-label": "search your favorite watchs",
                            }}
                            onChange={(e) => setQuery(e.target.value)}
                            onClick={() => {
                                setShowPannelResult(true);
                            }}
                            value={query}
                        />
                    </Box>
                    {showPannelResult && (
                        <Box
                            position="absolute"
                            minHeight="300px"
                            width="100%"
                            zIndex={1000}
                            display="flex"
                            borderRadius={3}
                            p={2}
                            border={1}
                            bgcolor="white"
                            sx={{ boxShadow: 2 }}
                        >
                            {/* Top Search */}
                            <Box>
                                <Typography pb={2}>Top Search</Typography>
                                <Divider />
                                <List>
                                    {topSearches.map((e) => (
                                        <ListItem disablePadding>
                                            <ListItemButton color="secondary">
                                                <ListItemText primary={e} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <Box flex={1} ml={3}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography pb={2}>Products</Typography>
                                    <IconButton
                                        aria-label="delete"
                                        color="red"
                                        onClick={() => {
                                            setQuery("");
                                            setShowPannelResult(false);
                                        }}
                                    >
                                        <HighlightOffOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Divider />
                                <Box pt={2}>
                                    <WatchesFilter
                                        watches={watches}
                                        setShowPannelResult={
                                            setShowPannelResult
                                        }
                                        setQuery={setQuery}
                                    />
                                </Box>
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
                                onClick={handleCloseUserMenu}
                                LinkComponent={Link}
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
