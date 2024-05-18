import React from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { replace } from "formik";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useAuthContext();
    if (!user || user.role === "user") return <Navigate to={"/"} />;
    return <div>Here is Dashboard</div>;
};

export default Dashboard;
