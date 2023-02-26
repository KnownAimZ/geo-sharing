import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Geotags } from "./feature/geotags/geotags";
import { UpdateGeotag } from "./feature/geotags/update-geotag";
import { Profile } from "./feature/profile/profile";
import { GeotagsNew } from "./feature/geotags/geotags-new";
import { Avatar, Menu, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { User } from "./feature/auth/authSlice";
import "./App.scss";
import { axiosInstance } from "./api";
import { setSubscriptions } from "./feature/subscripitions/subscripitionsSlice";
import { MySubscriptions } from "./feature/subscripitions/my-subscriptions";
import { Users } from "./feature/users/users";

const { Text } = Typography;

export const App = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const getFirstLetters = (user: User | null) => {
    if (!user || !user.first_name || !user.last_name) return;
    return user.first_name[0] + user.last_name[0];
  };

  const getFullName = (user: User | null) => {
    if (!user || !user.first_name || !user.last_name) return;
    return `${user.first_name} ${user.last_name}`;
  };

  const loadSubscriptions = async () => {
    const { data } = await axiosInstance.get("/subscription/subscriptions");
    dispatch(setSubscriptions(data.subscriptions));
    const { data: _data } = await axiosInstance.post(
      "/subscription/find-user",
      { first_name: "Nik" }
    );
  };

  const getPageName = () => {
    switch (location.pathname) {
      case "/geotags":
        return "Geotags";
      case "/geotags-new":
        return "New Geotag";
      case "/profile":
        return "Profile";
      case "/subscriptions":
        return "Subscriptions";
      case "/users":
        return "Find Friend";
      default:
        return "App";
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      loadSubscriptions();
    }
  }, [user]);

  return (
    <div>
      <div className="topbar">
        <Title level={2}>{getPageName()}</Title>

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
      <div className="container">
        <Menu mode="inline" className="sidebar">
          <Menu.Item key="geotags">
            <Link to={"/geotags"}>Geotags</Link>
          </Menu.Item>
          <Menu.Item key="geotags-new">
            <Link to={"/geotags-new"}>New Geotag</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link to={"/profile"}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="subscriptions">
            <Link to={"/subscriptions"}>My Subscriptions</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to={"/users"}>Find Friend</Link>
          </Menu.Item>
        </Menu>
        <div className="container__content">
          <Routes>
            <Route path="geotags" element={<Geotags />} />
            <Route path="geotags-new" element={<GeotagsNew />} />
            <Route path="geotags/:id" element={<UpdateGeotag />} />
            <Route path="profile" element={<Profile />} />
            <Route path="subscriptions" element={<MySubscriptions />} />
            <Route path="users" element={<Users />} />
            <Route path="" element={<Navigate to="/geotags" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
