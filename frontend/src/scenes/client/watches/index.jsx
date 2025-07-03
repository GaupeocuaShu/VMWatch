import React from "react";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import useFetchWatches from "../../../utils/hooks/watches/useFetchWatchs";
import WatchList from "../../../components/WatchList";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import useQuery from "../../../utils/hooks/queries/useQuery";
import Error from "../../../components/Error";
import LoadingComponent from "../../../components/LoadingComponent";
const Watches = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const type = useQuery().get("type");
    const { watches, loading, error } = useFetchWatches({ type });
    if (loading) return <LoadingComponent />;
    if (error) return <Error errorMessage={error} />;
    return <WatchList gender={type} watches={watches} />;
};

export default Watches;
