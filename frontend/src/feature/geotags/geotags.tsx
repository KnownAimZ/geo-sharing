import { useEffect, useState } from "react";
import { axiosInstance } from "../../api";
import { Marker } from "../map/marker";
import { Map } from "../map/map";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Empty, Input, Typography } from "antd";
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
  const [searchGeotag, setSearchGeotag] = useState<string | undefined>();
  const [focusedItemId, setFocusedItemId] = useState<number | null>(null);

  const loadGeotags = async () => {
    const { data } = await axiosInstance.get("/users/geotags");
    if (!data?.geotags) return;
    setGeotags(data.geotags);
  };

  useEffect(() => {
    loadGeotags();
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

  const filterBySearchName = (geotag: any) => {
    if (!searchGeotag) return true;
    return geotag.name.toLowerCase().includes(searchGeotag.toLowerCase());
  };

  if (!geotags.length) {
    return (
      <Empty>
        <Link to={"/geotags-new"}>Add first geotag</Link>
      </Empty>
    );
  }

  return (
    <>
      <div className="content-container">
        <Wrapper>
          <Map
            center={center}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: "1", height: "500px" }}
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
        <div className="list">
          <span className="default-text">Find geotag by name:</span>
          <Input
            placeholder="Find by name"
            className="custom-input"
            value={searchGeotag}
            onChange={(event) => setSearchGeotag(event.target.value)}
          />
          {geotags.filter(filterBySearchName).map((geotag: any) => (
            <div
              key={geotag.geotag_id}
              className={classNames({
                list__item: true,
                "list__item--selected": geotag.geotag_id === focusedItemId,
              })}
              onClick={() => focusOn(geotag)}
            >
              <div className="list__item__block">
                <Text className="default-text" strong>
                  {geotag.name}
                </Text>
                <Text className="default-text">{geotag.description}</Text>
              </div>
              <Link
                className="default-text"
                to={`/geotags/${geotag.geotag_id}`}
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="content-container mt-2">
        <Link className="default-text" to={"/geotags-new"}>
          Create new
        </Link>
      </div>
    </>
  );
};
