import { createBrowserRouter } from "react-router";
import SignUp from "./components/auth/signUp.jsx";
import LogIn from "./components/auth/logIn.jsx";

const routes = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/log-in",
        element: <LogIn />,
    },
]);

export default routes;
