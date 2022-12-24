import { axiosInstance, removeToken } from "../../api";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { removeUser } from "./authSlice";

export const Logout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const logout = () => {
    axiosInstance.post("/users/logout", {});
    removeToken();
    dispatch(removeUser());
  };

  return <button onClick={logout}>Log out</button>;
};
