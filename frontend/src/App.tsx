import { useEffect } from "react";
import { Topbar } from "./feature/profile/topbar";
import { useAppSelector } from "./hooks";
import {
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import { Geotags } from "./feature/geotags/geotags";
import { UpdateGeotag } from "./feature/geotag/update-geotag";
import { Profile } from "./feature/profile/profile";
import { GeotagsNew } from "./feature/geotags/geotags-new";

export const App = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      <Topbar />
      <div style={{ width: "100vw", marginTop: "75px" }}>
        <Routes>
          <Route path="geotags" element={<Geotags />} />
          <Route path="geotags-new" element={<GeotagsNew />} />
          <Route path="geotags/:id" element={<UpdateGeotag />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};
