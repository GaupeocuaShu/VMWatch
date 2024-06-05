import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ChargingStationOutlinedIcon from "@mui/icons-material/ChargingStationOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
const gurantees = [
    {
        title: "Extend warranty up to 5 years",
        icon: <Looks5OutlinedIcon sx={{ fontSize: 40 }} color="secondary" />,
    },
    {
        title: "Get 10 times refund if counterfeit goods are detected",
        icon: (
            <CurrencyExchangeOutlinedIcon
                sx={{ fontSize: 40 }}
                color="secondary"
            />
        ),
    },
    {
        title: "International standard warranty cente",
        icon: (
            <VerifiedUserOutlinedIcon sx={{ fontSize: 40 }} color="secondary" />
        ),
    },
    {
        title: "Free lifetime battery replacement",
        icon: (
            <ChargingStationOutlinedIcon
                sx={{ fontSize: 40 }}
                color="secondary"
            />
        ),
    },
    {
        title: "Super-fast 2-hour COD shipping",
        icon: (
            <LocalShippingOutlinedIcon
                sx={{ fontSize: 40 }}
                color="secondary"
            />
        ),
    },
    {
        title: "Over 30 years of experience and service",
        icon: <Looks5OutlinedIcon sx={{ fontSize: 40 }} color="secondary" />,
    },
    {
        title: "Wrong size? Not satisfied? Exchange within 7 days ",
        icon: (
            <ChangeCircleOutlinedIcon sx={{ fontSize: 40 }} color="secondary" />
        ),
    },
];
export default function Gurantees({ matches }) {
    return (
        <List
            sx={{
                display: "grid",
                gridTemplateColumns: matches
                    ? "repeat(4,1fr)"
                    : "repeat(2,1fr)",
                gap: "1rem",
            }}
        >
            {gurantees.map((e, i) => (
                <ListItem
                    sx={{
                        border: "1px solid rgba(64, 64, 64, 0.1)",
                        borderRadius: "10px",
                    }}
                >
                    <ListItemIcon>{e.icon}</ListItemIcon>
                    <ListItemText primary={e.title} />
                </ListItem>
            ))}
        </List>
    );
}
