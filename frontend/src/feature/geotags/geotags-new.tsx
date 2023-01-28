import { Button, Form, Input, InputNumber, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";
import { Map } from "../map/map";
import { Wrapper } from "@googlemaps/react-wrapper";
const { useForm, useWatch } = Form;
import "./geotags.scss";
import { PulsingPoint } from "../map/pulsing-point";

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

  useEffect(() => {
    form.setFieldsValue({ ...center });
  }, [center]);

  useEffect(() => {
    if (typeof lat === "number" && typeof lng === "number") {
      setCenter({ lat, lng });
    }
  }, [lat, lng]);

  return (
    <div className="geotags-new">
      <Wrapper>
        <div style={{ position: "relative" }}>
          <div className="geotags-new__map-pulsing-point">
            <PulsingPoint />
          </div>
          <Map
            center={center}
            zoom={zoom}
            onIdle={onIdle}
            style={{ flexGrow: "1", height: "500px", width: "500px" }}
          />
        </div>
      </Wrapper>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        className="geotags-new__form"
      >
        <div>
          <Form.Item
            label="Latitude"
            name="lat"
            rules={[{ required: true, message: "Please input latitude!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Longtitude"
            name="lng"
            rules={[{ required: true, message: "Please input longtitude!" }]}
          >
            <InputNumber />
          </Form.Item>
        </div>
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
      <Link to={"/geotags"}>To geotags</Link>
    </div>
  );
};
