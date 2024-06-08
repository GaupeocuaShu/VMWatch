import { Navigate, createBrowserRouter } from "react-router-dom";
import SignUp from "./scenes/auth/sign-up";
import Login from "./scenes/auth/login";
import Master from "./scenes/client/layout/master";
import Home from "./scenes/client/home";
import Dashboard from "./scenes/dashboard/home";
import ProductDetail from "./scenes/client/product-detail";
import AdminMaster from "./scenes/admin/global/master";
import Team from "./scenes/admin/team";
import Form from "./scenes/admin/form";
import User from "./scenes/admin/users";
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
            { path: "/product/:productSlug", element: <ProductDetail /> },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/admin",
        element: <AdminMaster />,
        children: [
            { path: "/admin/team", element: <Team /> },
            { path: "/admin/user", element: <User /> },
            { path: "/admin/team/:action", element: <Form /> },
        ],
    },
]);

export default router;
