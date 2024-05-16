import { Navigate, createBrowserRouter } from "react-router-dom";
import SignUp from "./scenes/auth/sign-up";
import Login from "./scenes/auth/login";
const router = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;
