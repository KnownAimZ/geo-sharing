import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Button, Form, Input } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";
import { Map } from "../map/map";
import { Marker } from "../map/marker";
const { useForm } = Form;

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export const Geotag = () => {
  const [form] = useForm();
  const [geotags, setGeotags] = useState([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const loadGeotags = async () => {
    getLocation();
    const { data } = await axiosInstance.get("/users/geotags");
    if (!data?.geotags) return;
    setGeotags(data.geotags);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    }
  }

  function showPosition(position: any) {
    console.log(position.coords);
  }

  const onFinish = async (values: any) => {
    handleApiFormError(() => createGeotag(values), form);
  };

  const createGeotag = async (_data: any) => {
    console.log(_data);
    const requestData = {
      name: _data.name,
      location: { lat: _data.lat, lng: _data.lng },
      description: _data.description,
    };
    console.log(requestData);

    const { data } = await axiosInstance.post(
      "/users/create-geotag",
      requestData
    );

    if (data.status === "Success") {
      loadGeotags();
    }
  };

  const deleteGeotag = async (id: number) => {
    const { data } = await axiosInstance.delete(
      `/users/delete-geotag?geotag_id=${id}`
    );
    if (!data?.geotags) return;
    setGeotags(data.geotags);
  };

  useEffect(() => {
    loadGeotags();
  }, []);

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          {geotags.map((geotag: any) => (
            <div key={geotag.geotag_id}>
              <p>{JSON.stringify(geotag)}</p>
              <Link to={`/geotag/${geotag.geotag_id}`}>
                Go to {geotag.name}
              </Link>
              <Button onClick={() => deleteGeotag(geotag.geotag_id)}>
                Delete {geotag.name}
              </Button>
            </div>
          ))}
        </div>
        <Wrapper
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
          render={render}
        >
          <Map
            center={center}
            // onClick={onClick}
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
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Latitude"
          name="lat"
          rules={[{ required: true, message: "Please input latitude!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Longtitude"
          name="lng"
          rules={[{ required: true, message: "Please input longtitude!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
