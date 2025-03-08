import { createBrowserRouter } from "react-router";
import SignUp from "./components/auth/signUp.jsx";
import LogIn from "./components/auth/logIn.jsx";
import Search from "./components/user/search.jsx";
import Profile from "./components/user/profile.jsx";

const routes = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/log-in",
        element: <LogIn />,
    },
    {
        path: "/search",
        element: <Search />,
    },
    {
        path: "/user/:username",
        element: <Profile />,
    },
]);

export default routes;
