import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import store from "./store";

// axios

axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
let token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;

// Routes
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { Provider } from "react-redux";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
      <ToastContainer theme="colored" />
    </Provider>
  </Router>
);
