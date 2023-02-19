import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import { Marker } from "../map/marker";
import { Map } from "../map/map";
import { Wrapper } from "@googlemaps/react-wrapper";
import "./geotags.scss";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";
const { Text } = Typography;

export const Geotags = () => {
  const [geotags, setGeotags] = useState([]);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const [focusedItemId, setFocusedItemId] = useState<number | null>(null);

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
    setFocusedItemId(geotag.geotag_id);
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
            <div
              key={geotag.geotag_id}
              className={classNames({
                "geotag-list__item": true,
                "geotag-list__item--selected":
                  geotag.geotag_id === focusedItemId,
              })}
              onClick={() => focusOn(geotag)}
            >
              <div className="geotag-list__item__block">
                <Text strong>{geotag.name}</Text>
                <Text>{geotag.description}</Text>
              </div>
              <Link to={`/geotags/${geotag.geotag_id}`}>Edit</Link>
            </div>
          ))}
        </div>
      </div>
      <Link to={"/geotags-new"}>Create new</Link>
    </>
  );
};
