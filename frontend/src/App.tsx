import { useEffect, useState } from "react";
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
import { Space, Typography } from "antd";
import { User } from "./feature/auth/authSlice";
import { axiosInstance } from "./api";
import { setSubscriptions } from "./feature/subscripitions/subscripitionsSlice";
import { MySubscriptions } from "./feature/subscripitions/my-subscriptions";
import { Users } from "./feature/users/users";
import { Sidebar } from "./sidebar";
import { Menu } from "./menu";

const { Text } = Typography;

export const App = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
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
        <span className="hidden md:inline-block default-text text-2xl font-semibold">
          {getPageName()}
        </span>
        <button
          className="inline-block md:hidden default-text"
          onClick={() => setIsMenuOpened((prev) => !prev)}
        >
          {isMenuOpened ? "Close" : "Open"} menu
        </button>

        <div className="flex items-center gap-2">
          <div className="default-text h-10 w-10 rounded-full ring-2 ring-black dark:ring-white flex items-center justify-center">
            {getFirstLetters(user)}
          </div>
          <Space
            className="hidden md:block"
            direction="vertical"
            size={0}
            align="start"
          >
            <Link className="default-text" to={"/profile"}>
              {getFullName(user)}
            </Link>
            <Text className="default-text">{user?.email}</Text>
          </Space>
        </div>
      </div>
      {isMenuOpened ? (
        <Menu onClick={() => setIsMenuOpened(false)} />
      ) : (
        <div className="app-container">
          <Sidebar />
          <div className="p-2 md:p-4 w-full">
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
      )}
    </div>
  );
};
