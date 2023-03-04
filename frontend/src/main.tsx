import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { App } from "./App";
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from "./feature/auth/login";
import { Register } from "./feature/auth/register";
import { ThemeWrapper } from "./theme-wrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeWrapper>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </ThemeWrapper>
  </Provider>
  // </React.StrictMode>
);
