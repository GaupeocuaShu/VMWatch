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
import Test from "./scenes/admin/test";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingComponent from "./components/LoadingComponent";
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
const EditBanner = lazy(() =>
    import("./scenes/admin/banner-slider/EditBanner")
);
const CreateBanner = lazy(() =>
    import("./scenes/admin/banner-slider/CreateBanner")
);
const BrandList = lazy(() => import("./scenes/admin/brands/index"));
const EditBrand = lazy(() => import("./scenes/admin/brands/EditBrand"));
const CreateBrand = lazy(() => import("./scenes/admin/brands/CreateBrand"));
const WatchVariant = lazy(() => import("./scenes/admin/watch-variant"));

const WatchList = lazy(() => import("./scenes/admin/watchs/index"));
const EditWatch = lazy(() => import("./scenes/admin/watchs/EditWatch"));
const CreateWatch = lazy(() => import("./scenes/admin/watchs/CreateWatch"));

const WatchGalleryList = lazy(() =>
    import("./scenes/admin/watchs/Gallery/index")
);
const EditWatchGallery = lazy(() =>
    import("./scenes/admin/watchs/Gallery/EditWatchGallery")
);
const CreateWatchGallery = lazy(() =>
    import("./scenes/admin/watchs/Gallery/CreateWatchGallery")
);

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
        BANNER_SLIDER: "/admin/banner",
        CREATE_BANNER_SLIDER: "/admin/banner/create",
        EDIT_BANNER_SLIDER: "/admin/banner/:id/edit",

        // Brand
        BRAND: "/admin/brand",
        CREATE_BRAND: "/admin/brand/create",
        EDIT_BRAND: "/admin/brand/:id/edit",

        // Brand
        WATCH_VARIANT: "/admin/watch-variant",

        // WATCH
        WATCH: "/admin/watch",
        CREATE_WATCH: "/admin/watch/create",
        EDIT_WATCH: "/admin/watch/:id/edit",

        // WATCH GALLERY

        WATCH_GALLERY: "/admin/watch/:id/watch-gallery",
        CREATE_WATCH_GALLERY: "/admin/watch/:id/watch-gallery/create",
        EDIT_WATCH_GALLERY: "/admin/watch/:id/watch-gallery/:id/edit",

        TEST: "/admin/test",
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
            {
                path: routes.ADMIN.EDIT_BANNER_SLIDER,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditBanner />
                    </Suspense>
                ),
            },
            // -----------------------------------------------

            //  BRAND ---------------------------------------------------------

            {
                path: routes.ADMIN.BRAND,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <BrandList />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.CREATE_BRAND,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <CreateBrand />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.EDIT_BRAND,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditBrand />
                    </Suspense>
                ),
            },
            // -----------------------------------------------
            //  STRAP ---------------------------------------------------------

            {
                path: routes.ADMIN.WATCH_VARIANT,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <WatchVariant />
                    </Suspense>
                ),
            },

            // -----------------------------------------------

            //  WATCH ---------------------------------------------------------

            {
                path: routes.ADMIN.WATCH,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <WatchList />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.CREATE_WATCH,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <CreateWatch />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.EDIT_WATCH,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditWatch />
                    </Suspense>
                ),
            },
            //  GALLERY ---------------------------------------------------------

            {
                path: routes.ADMIN.WATCH_GALLERY,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <WatchGalleryList />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.CREATE_WATCH_GALLERY,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <CreateWatchGallery />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.EDIT_BRAND,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditWatchGallery />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.TEST,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <Test />
                    </Suspense>
                ),
            },
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
