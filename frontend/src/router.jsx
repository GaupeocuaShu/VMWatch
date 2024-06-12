// import { Navigate, createBrowserRouter } from "react-router-dom";
// import SignUp from "./scenes/auth/sign-up";
// import Login from "./scenes/auth/login";
// import Master from "./scenes/client/layout/master";
// import Home from "./scenes/client/home";
// import Dashboard from "./scenes/dashboard/home";
// import ProductDetail from "./scenes/client/product-detail";
// import AdminMaster from "./scenes/admin/global/master";
// import User from "./scenes/admin/users";
// import { CreateUser } from "./scenes/admin/users/CreateUser";
// import { EditUser } from "./scenes/admin/users/EditUser";
// const router = createBrowserRouter([
//     {
//         path: "/sign-up",
//         element: <SignUp />,
//     },
//     {
//         path: "/login",
//         element: <Login />,
//     },
//     {
//         path: "/",
//         element: <Master />,
//         children: [
//             { path: "/", element: <Home /> },
//             { path: "/home", element: <Home /> },
//             { path: "/product/:productSlug", element: <ProductDetail /> },
//         ],
//     },
//     {
//         path: "/dashboard",
//         element: <Dashboard />,
//     },
//     {
//         path: "/admin",
//         element: <AdminMaster />,
//         children: [
//             { path: "/admin/user", element: <User /> },
//             { path: "/admin/user/create", element: <CreateUser /> },
//             { path: "/admin/user/:id/edit", element: <EditUser /> },
//             { path: "/admin/banner-slider", element: <EditUser /> },
//         ],
//     },
// ]);

// export default router;

import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingComponent from "./components/LoadingComponent";
import CreateBanner from "./scenes/admin/banner-slider/CreateBanner";

const SignUp = lazy(() => import("./scenes/auth/sign-up"));
const Login = lazy(() => import("./scenes/auth/login"));
const Master = lazy(() => import("./scenes/client/layout/master"));
const Home = lazy(() => import("./scenes/client/home"));
const Dashboard = lazy(() => import("./scenes/dashboard/home"));
const ProductDetail = lazy(() => import("./scenes/client/product-detail"));
const AdminMaster = lazy(() => import("./scenes/admin/global/master"));
const UserList = lazy(() => import("./scenes/admin/users"));
const CreateUser = lazy(() => import("./scenes/admin/users/CreateUser"));
const EditUser = lazy(() => import("./scenes/admin/users/EditUser"));
const NotFound = lazy(() => import("./scenes/NotFound"));
const BannerSlider = lazy(() => import("./scenes/admin/banner-slider"));
const routes = {
    SIGN_UP: "/sign-up",
    LOGIN: "/login",
    HOME: "/",
    DASHBOARD: "/dashboard",
    ADMIN: {
        ROOT: "/admin",

        // User
        USER: "/admin/user",
        CREATE_USER: "/admin/user/create",
        EDIT_USER: "/admin/user/:id/edit",

        // Slider
        BANNER_SLIDER: "/admin/banner-slider",
        CREATE_BANNER_SLIDER: "/admin/banner-slider/create",
        EDIT_BANNER_SLIDER: "/admin/banner-slider/:id/edit",
    },
    PRODUCT_DETAIL: "/product/:productSlug",
};

const router = createBrowserRouter([
    {
        path: routes.SIGN_UP,
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <SignUp />
            </Suspense>
        ),
    },
    {
        path: routes.LOGIN,
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: routes.HOME,
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <Master />
            </Suspense>
        ),
        children: [
            { path: routes.HOME, element: <Home /> },
            { path: "/home", element: <Home /> },
            {
                path: routes.PRODUCT_DETAIL,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <ProductDetail />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: routes.DASHBOARD,
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <Dashboard />
            </Suspense>
        ),
    },
    {
        path: routes.ADMIN.ROOT,
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <AdminMaster />
            </Suspense>
        ),
        children: [
            //  User ---------------------------------------------------------
            {
                path: routes.ADMIN.USER,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <UserList />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.CREATE_USER,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <CreateUser />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.EDIT_USER,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditUser />
                    </Suspense>
                ),
            },
            // -----------------------------------------------------
            //  Banner ---------------------------------------------------------

            {
                path: routes.ADMIN.BANNER_SLIDER,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <BannerSlider />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.CREATE_BANNER_SLIDER,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <CreateBanner />
                    </Suspense>
                ),
            },
            // -----------------------------------------------
        ],
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <NotFound />
            </Suspense>
        ),
    },
]);

export default router;
