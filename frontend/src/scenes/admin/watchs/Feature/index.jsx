import React, { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import CustomDataGrid from "../../../../components/CustomDataGrid";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useParams } from "react-router-dom";
const WatchFeature = () => {
    const { watchID } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const getFeatures = async () => {
            try {
                const { data } = await axiosClient("api/features");
                console.log(data.data);
                setOptions(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getFeatures();
    }, []);
    const valueOptions = options.map((o) => o.name);
    const myColumn = {
        field: "feature_name",
        headerName: "feature",
        width: 300,
        editable: true,
        type: "singleSelect",
        valueOptions: valueOptions,
    };
    return (
        <Box m="20px" height="100%">
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
                <CustomDataGrid
                    title="Feature Watch"
                    api={`watches/${watchID}/feature-watch`}
                    description="Manage Strap"
                    customColumn={myColumn}
                />
            </Box>
        </Box>
    );
};

export default WatchFeature;
