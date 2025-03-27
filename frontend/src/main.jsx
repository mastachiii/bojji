import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router";
import Wrapper from "./components/wrapper";
import routes from "./routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Wrapper>
            <RouterProvider router={routes} />
        </Wrapper>
    </StrictMode>
);
