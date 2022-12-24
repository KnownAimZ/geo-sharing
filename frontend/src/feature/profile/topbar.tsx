import Title from "antd/es/typography/Title";
import { useAppSelector } from "../../hooks";
import React from "react";
import { Avatar } from "antd";
import { User } from "../auth/authSlice";
import "./topbar.scss";

export const Topbar = () => {
  const user = useAppSelector((state) => state.user.user);

  const getFirstLetters = (user: User | null) => {
    if (!user || !user.first_name || !user.last_name) return;
    return user.first_name[0] + user.last_name[0];
  };

  return (
    <div className="topbar">
      <Title level={2}>App</Title>
      <div className="topbar__content">
        <Avatar>{getFirstLetters(user)}</Avatar>
      </div>
    </div>
  );
};
