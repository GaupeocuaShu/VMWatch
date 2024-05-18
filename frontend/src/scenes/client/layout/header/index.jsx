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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Logo from "../../../../components/Logo";
import { Link } from "react-router-dom";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import { useAuthContext } from "../../../../contexts/AuthContext";
import axiosClient from "../../../../axios-client";

// "Account", "Order", "Cart", "Log out"
const settings = [
    {
        name: "Profile",
        link: "/profile",
        icon: <PersonOutlinedIcon fontSize="sm" />,
    },
    {
        name: "Order",
        link: "/order",
        icon: <WatchOutlinedIcon fontSize="sm" />,
    },
];
const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, setUser } = useAuthContext();

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

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Logo />
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                columnGap={4}
            >
                <Box
                    width="400px"
                    display="flex"
                    bgcolor="#f0f0f0"
                    borderRadius="5px"
                    height="40px"
                >
                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="search your favorite watchs"
                        inputProps={{
                            "aria-label": "search your favorite watchs",
                        }}
                    />
                </Box>
                {!user ? (
                    <Button
                        LinkComponent={Link}
                        to="/login"
                        endIcon={<LoginOutlinedIcon />}
                        variant="outlined"
                    >
                        Login
                    </Button>
                ) : (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
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
                            {settings.map((setting, key) => (
                                <MenuItem
                                    sx={{ width: "150px" }}
                                    key={key + 1}
                                    onClick={handleCloseUserMenu}
                                    LinkComponent={Link}
                                    to={setting.link}
                                >
                                    {setting.icon}
                                    <Typography
                                        textAlign="center"
                                        marginLeft={1}
                                    >
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <MenuItem
                                key={settings.length + 1}
                                sx={{ width: "150px" }}
                                onClick={handleLogOut}
                            >
                                <LoginOutlinedIcon
                                    fontSize="sm"
                                    color="error"
                                />

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
                        <IconButton>
                            <ShoppingCartOutlinedIcon
                                sx={{ fontSize: "30px" }}
                            />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Header;
