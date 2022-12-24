import "./App.css";
import { Logout } from "./feature/auth/logout";
import { Login } from "./feature/auth/login";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./feature/auth/register";
import { Profile } from "./feature/profile/profile";
import { Topbar } from "./feature/profile/topbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Topbar />
        <Profile />
        <Logout />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
