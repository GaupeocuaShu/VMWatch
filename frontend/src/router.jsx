import { Navigate, createBrowserRouter } from "react-router-dom";
import SignUp from "./scenes/auth/sign-up";
import Login from "./scenes/auth/login";
import Master from "./scenes/client/layout/master";
import Home from "./scenes/client/home";
import Dashboard from "./scenes/dashboard/home";
const router = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Master />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/home", element: <Home /> },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

export default router;
