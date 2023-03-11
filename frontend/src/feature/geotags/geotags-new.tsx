import { Form, Input, InputNumber, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";
import { Map } from "../map/map";
import { Wrapper } from "@googlemaps/react-wrapper";
const { useForm, useWatch } = Form;
import { PulsingPoint } from "../map/pulsing-point";
import { GSLabel } from "../../components/label";

export const GeotagsNew = () => {
  const [form] = useForm();
  const lat = useWatch("lat", form);
  const lng = useWatch("lng", form);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onFinish = async (values: any) => {
    handleApiFormError(() => createGeotag(values), form);
  };

  const createGeotag = async (_data: any) => {
    const requestData = {
      name: _data.name,
      location: { lat: _data.lat, lng: _data.lng },
      description: _data.description,
    };

    const { data } = await axiosInstance.post(
      "/users/create-geotag",
      requestData
    );

    notification.success({
      message: `${requestData.name} successfully created!`,
    });
    form.resetFields();
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const setCurrentGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter({ ...pos });
      },
      () => {
        notification.error({
          message: "Geolocation error",
        });
      }
    );
  };

  useEffect(() => {
    form.setFieldsValue({ ...center });
  }, [center]);

  useEffect(() => {
    if (typeof lat === "number" && typeof lng === "number") {
      setCenter({ lat, lng });
    }
  }, [lat, lng]);

  return (
    <div className="content-container">
      <Wrapper>
        <div className="geotag-map-wrapper">
          <div className="geotag-map-wrapper__pulsing-point">
            <PulsingPoint />
          </div>
          <Map
            center={center}
            zoom={zoom}
            onIdle={onIdle}
            style={{ flexGrow: "1", height: "500px" }}
          />
        </div>
      </Wrapper>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        className="w-full md:w-1/2"
      >
        <div>
          <Form.Item
            label={<GSLabel>Latitude</GSLabel>}
            name="lat"
            rules={[{ required: true, message: "Please input latitude!" }]}
          >
            <InputNumber className="custom-input" />
          </Form.Item>

          <Form.Item
            label={<GSLabel>Longtitude</GSLabel>}
            name="lng"
            rules={[{ required: true, message: "Please input longtitude!" }]}
          >
            <InputNumber className="custom-input" />
          </Form.Item>
        </div>
        <Form.Item
          label={<GSLabel>Name</GSLabel>}
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item label={<GSLabel>Description</GSLabel>} name="description">
          <Input className="custom-input" />
        </Form.Item>
        <div className="flex w-full items-center justify-center">
          <button className="btn-primary mr-2" type="submit">
            Submit
          </button>
          <button
            className="btn-secondary"
            type="button"
            onClick={setCurrentGeolocation}
          >
            Set current location
          </button>
        </div>
        <div className="content-container mt-2">
          <Link className="default-text" to={"/geotags"}>
            To geotags
          </Link>
        </div>
      </Form>
    </div>
  );
};
