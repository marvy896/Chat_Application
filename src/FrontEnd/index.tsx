import { createRoot } from "react-dom/client";
import React from "react";
import  App  from "./App";
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import './socket'

const container = document.getElementById("root")!;
const root = createRoot(container)
root.render(<App />);
