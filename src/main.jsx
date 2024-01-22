import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import {BrowserRouter} from "react-router-dom";
import "./index.css";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev/index.js";
import {AuthProvider} from "@/pages/AuthConfig/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </DevSupport>
    </React.StrictMode>
);
