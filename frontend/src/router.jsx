import Test from "./scenes/admin/test";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingComponent from "./components/LoadingComponent";
import Watches from "./scenes/client/watches";

const DetailBrand = lazy(() => import("./scenes/client/detail-brand"));
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

const BrandGalleryList = lazy(() =>
    import("./scenes/admin/brands/Gallery/index")
);
const EditBrandGallery = lazy(() =>
    import("./scenes/admin/brands/Gallery/EditBrandGallery")
);
const CreateBrandGallery = lazy(() =>
    import("./scenes/admin/brands/Gallery/CreateBrandGallery")
);

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

const WatchCollectionList = lazy(() =>
    import("./scenes/admin/watch-collection/index")
);
const EditWatchCollection = lazy(() =>
    import("./scenes/admin/watch-collection/EditWatchCollection")
);
const CreateWatchCollection = lazy(() =>
    import("./scenes/admin/watch-collection/CreateWatchCollection")
);
const SearchResults = lazy(() => import("./scenes/client/search-results"));
const WatchFeature = lazy(() => import("./scenes/admin/watchs/Feature/index"));
const Cart = lazy(() => import("./scenes/client/cart"));
const Order = lazy(() => import("./scenes/client/order"));
const OrderDetail = lazy(() => import("./scenes/client/order-detail"));
const PaymentSuccess = lazy(() =>
    import("./scenes/client/payment/payment-success")
);
const PaymentCancel = lazy(() =>
    import("./scenes/client/payment/payment-cancel")
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

        // Brand GALLERY

        BRAND_GALLERY: "/admin/brand/:id/brand-gallery",
        CREATE_BRAND_GALLERY: "/admin/brand/:id/brand-gallery/create",
        EDIT_BRAND_GALLERY: "/admin/brand/:brandID/brand-gallery/:id/edit",

        // Brand
        WATCH_VARIANT: "/admin/watch-variant",

        // WATCH
        WATCH: "/admin/watch",
        CREATE_WATCH: "/admin/watch/create",
        EDIT_WATCH: "/admin/watch/:id/edit",

        // WATCH GALLERY

        WATCH_GALLERY: "/admin/watch/:id/watch-gallery",
        CREATE_WATCH_GALLERY: "/admin/watch/:id/watch-gallery/create",
        EDIT_WATCH_GALLERY: "/admin/watch/:watchID/watch-gallery/:id/edit",

        // Watch Collection
        WATCH_COLLECTION: "/admin/watch-collection",
        CREATE_WATCH_COLLECTION: "/admin/watch-collection/create",
        EDIT_WATCH_COLLECTION: "/admin/watch-collection/:id/edit",

        // WATCH FEATURE
        WATCH_FEATURE: "/admin/watch/:watchID/watch-feature",

        TEST: "/admin/test",
    },
    PRODUCT_DETAIL: "/product/:productSlug",

    SEARCH_RESULTS: "/search-results",

    CART: "/my-cart",
    WATCHES: "/watches",
    BRANDS: "/brands/:brandSlug",
    ORDER: "/orders",
    ORDER_DETAIL: "/orders/:id",
    PAYMENT_SUCCESS: "/payment/success",
    PAYMENT_CANCEL: "/payment/cancel",
};

const router = createBrowserRouter([
    // Auth Routes
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
            { path: routes.WATCHES, element: <Watches /> },
            { path: routes.BRANDS, element: <DetailBrand /> },
            // Product Detail
            {
                path: routes.PRODUCT_DETAIL,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <ProductDetail />
                    </Suspense>
                ),
            },
            // Search Results
            {
                path: routes.SEARCH_RESULTS,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <SearchResults />
                    </Suspense>
                ),
            },
            // Cart
            {
                path: routes.CART,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <Cart />
                    </Suspense>
                ),
            },
            // Order
            {
                path: routes.ORDER,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <Order />
                    </Suspense>
                ),
            },

            // Order Detail
            {
                path: routes.ORDER_DETAIL,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <OrderDetail />
                    </Suspense>
                ),
            },

            // Payment Success
            {
                path: routes.PAYMENT_SUCCESS,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <PaymentSuccess />
                    </Suspense>
                ),
            },
            // Payment Cancel
            {
                path: routes.PAYMENT_CANCEL,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <PaymentCancel />
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

    // Admin Routes
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

            //  GALLERY ---------------------------------------------------------

            {
                path: routes.ADMIN.BRAND_GALLERY,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <BrandGalleryList />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.CREATE_BRAND_GALLERY,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <CreateBrandGallery />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.EDIT_BRAND_GALLERY,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditBrandGallery />
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
                path: routes.ADMIN.EDIT_WATCH_GALLERY,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditWatchGallery />
                    </Suspense>
                ),
            },

            //  Collection ---------------------------------------------------------

            {
                path: routes.ADMIN.WATCH_COLLECTION,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <WatchCollectionList />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.CREATE_WATCH_COLLECTION,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <CreateWatchCollection />
                    </Suspense>
                ),
            },
            {
                path: routes.ADMIN.EDIT_WATCH_COLLECTION,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <EditWatchCollection />
                    </Suspense>
                ),
            },
            //  FEATURE ---------------------------------------------------------
            {
                path: routes.ADMIN.WATCH_FEATURE,
                element: (
                    <Suspense fallback={<LoadingComponent />}>
                        <WatchFeature />
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
    // Not Found Route
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
