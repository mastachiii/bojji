import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router";
import Wrapper from "./components/wrapper";
import routes from "./routes";
import "./index.css";
import LogIn from "./components/auth/logIn";
import SignUp from "./components/auth/signUp";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Wrapper>
            <RouterProvider router={routes} />
        </Wrapper>
    </StrictMode>
);
