import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import Strap from "../strap";
import DialSize from "../dial-size";
import DialShape from "../dial-shape";
import DialColor from "../dial-color";
import WaterResistanceLevel from "../water-resistance-level";
import Energy from "../energy";
import CaseColor from "../case-color";
import GlassMaterial from "../glass-material";
import Feature from "../feature";
const WatchVariant = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px" height="100%">
            <Header
                title="Watch Variants"
                subtitle="Managing the Watch Variants"
                action="none"
            />
            <Box
                m="40px 0 0 0"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },

                    "& .css-1x3ucb4-MuiDataGrid-root .MuiDataGrid-container--top [role='row']":
                        {
                            backgroundColor: colors.blueAccent[800],
                        },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[800],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .css-i6qwxd-MuiLinearProgress-root": {
                        height: "10px",
                        backgroundColor: colors.blueAccent[500],
                    },
                    "& .css-1v8wh1w-MuiLinearProgress-bar1": {
                        backgroundColor: colors.blueAccent[800],
                    },
                    "& .css-1v8wh1w-MuiLinearProgress-bar2": {
                        backgroundColor: colors.blueAccent[800],
                    },
                }}
            >
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(2,1fr)"
                    gridTemplateRows="repeat(5,500px)"
                    columnGap={5}
                    rowGap="150px"
                >
                    <Strap />
                    <DialSize />
                    <DialShape />
                    <DialColor />
                    <GlassMaterial />
                    <CaseColor />
                    <WaterResistanceLevel />
                    <Energy />
                    <Feature />
                </Box>
            </Box>
        </Box>
    );
};

export default WatchVariant;
