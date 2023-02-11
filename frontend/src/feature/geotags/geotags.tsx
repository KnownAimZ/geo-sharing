import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import { Marker } from "../map/marker";
import { Map } from "../map/map";
import { Wrapper } from "@googlemaps/react-wrapper";
import "./geotags.scss";
import { Typography } from "antd";
import { Link } from "react-router-dom";
const { Text } = Typography;

export const Geotags = () => {
  const [geotags, setGeotags] = useState([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const loadGeotags = async () => {
    const { data } = await axiosInstance.get("/users/geotags");
    if (!data?.geotags) return;
    setGeotags(data.geotags);
  };

  const findUser = async () => {
    const { data } = await axiosInstance.post("/subscription/find-user", {
      first_name: "Nik",
    });
  };

  useEffect(() => {
    loadGeotags();
    // findUser();
  }, []);

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const focusOn = (geotag: any) => {
    setCenter({ lat: +geotag.location.lat, lng: +geotag.location.lng });
    setZoom(12);
  };

  return (
    <>
      <div className="geotags-page">
        <Wrapper>
          <Map
            center={center}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: "1", height: "500px", width: "500px" }}
          >
            {geotags.map((geotag: any) => (
              <Marker
                key={+geotag.geotag_id}
                position={{
                  lat: +geotag.location.lat,
                  lng: +geotag.location.lng,
                }}
              />
            ))}
          </Map>
        </Wrapper>
        <div className="geotag-list">
          {geotags.map((geotag: any) => (
            <div key={geotag.geotag_id} className="geotag-list__item">
              <Text strong>{geotag.name}</Text>
              <Text>{geotag.description}</Text>
              <Link to={`/geotags/${geotag.geotag_id}`}>Edit</Link>
              <button onClick={() => focusOn(geotag)}>Focus</button>
            </div>
          ))}
        </div>
      </div>
      <Link to={"/geotags-new"}>Create new</Link>
    </>
  );
};
