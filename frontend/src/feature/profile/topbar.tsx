import Title from "antd/es/typography/Title";
import { useAppSelector } from "../../hooks";
import React from "react";
import { Avatar, Space, Typography } from "antd";
import { User } from "../auth/authSlice";
import "./topbar.scss";
import { Link } from "react-router-dom";

const { Text } = Typography;

export const Topbar = () => {
  const user = useAppSelector((state) => state.user.user);

  const getFirstLetters = (user: User | null) => {
    if (!user || !user.first_name || !user.last_name) return;
    return user.first_name[0] + user.last_name[0];
  };

  const getFullName = (user: User | null) => {
    if (!user || !user.first_name || !user.last_name) return;
    return `${user.first_name} ${user.last_name}`;
  };

  return (
    <div className="topbar">
      <Link to={"/geotags"}>
        <Title level={2}>App</Title>
      </Link>

      <div className="topbar__content">
        <Avatar shape="square" size={40}>
          {getFirstLetters(user)}
        </Avatar>
        <Space direction="vertical" size={0} align="start">
          <Link to={"/profile"}>
            <Text>{getFullName(user)}</Text>
          </Link>
          <Text>{user?.email}</Text>
        </Space>
      </div>
    </div>
  );
};
