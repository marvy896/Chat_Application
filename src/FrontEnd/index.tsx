import { createRoot } from "react-dom/client";
import React from "react";
import  App  from "./App";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import './socket'
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    )
