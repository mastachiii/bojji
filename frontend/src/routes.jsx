import { createBrowserRouter } from "react-router";
import SignUp from "./components/auth/signUp.jsx";

const routes = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
]);

export default routes;