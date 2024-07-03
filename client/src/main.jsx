import React from "react";
import ReactDOM from "react-dom/client";
import SiteLayout from "../components/SiteLayout.jsx";
import Web3Provider from "../components/Web3Provider.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3Provider>
      <SiteLayout>
        <App />
      </SiteLayout>
    </Web3Provider>
  </React.StrictMode>
);
