import { Wrapper } from "@googlemaps/react-wrapper";
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";
import { Map } from "../map/map";
import { Marker } from "../map/marker";
import { PulsingPoint } from "../map/pulsing-point";
const { Text } = Typography;
const { useForm, useWatch } = Form;

export const UpdateGeotag = () => {
  const [form] = useForm();
  const { id } = useParams();
  const [geotag, setGeotag] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const lat = useWatch("lat", form);
  const lng = useWatch("lng", form);
  const [zoom, setZoom] = useState(3); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const loadGeotag = async () => {
    const { data } = await axiosInstance.get(
      `/users/show-geotag?geotag_id=${id}`
    );
    if (!data?.geotags.length) return;
    const _geotag = data.geotags[0];
    setGeotag(_geotag);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const onFinish = async (values: any) => {
    handleApiFormError(() => updateGeotag(values), form);
  };

  const updateGeotag = async (_data: any) => {
    const requestData = {
      name: _data.name,
      location: { lat: _data.lat, lng: _data.lng },
      description: _data.description,
    };

    const { data } = await axiosInstance.put(
      `/users/update-geotag?geotag_id=${geotag.geotag_id}`,
      requestData
    );

    setGeotag({ ...geotag, ...requestData });

    notification.success({
      message: `${requestData.name} successfully updated!`,
    });

    setIsEditing(false);
  };

  const updateForm = () => {
    if (!geotag) return;
    const _geotag = {
      ...geotag,
      lat: geotag.location.lat,
      lng: geotag.location.lng,
    };
    form.setFieldsValue(_geotag);
    setCenter({ lat: +geotag.location.lat, lng: +geotag.location.lng });
  };

  useEffect(() => {
    if (!id) return;
    loadGeotag();
  }, [id]);

  useEffect(() => {
    if (!geotag) return;
    updateForm();
  }, [geotag]);

  useEffect(() => {
    if (typeof lat === "number" && typeof lng === "number") {
      setCenter({ lat, lng });
    }
  }, [lat, lng]);

  useEffect(() => {
    form.setFieldsValue({ ...center });
  }, [center]);

  if (!geotag) return null;

  return (
    <div className="geotags-new">
      {isEditing ? (
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
      ) : (
        <Wrapper>
          <Map
            center={{ lat: +geotag.location.lat, lng: +geotag.location.lng }}
            zoom={8}
            style={{ flexGrow: "1", height: "500px", width: "500px" }}
          >
            <Marker
              position={{
                lat: +geotag.location.lat,
                lng: +geotag.location.lng,
              }}
            />
          </Map>
        </Wrapper>
      )}
      {isEditing ? (
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

          <Button onClick={() => setIsEditing(false)} htmlType="button">
            Cancel
          </Button>
        </Form>
      ) : (
        <div className="geotags-new__info">
          <div className="geotags-new__text-row">
            <Text strong>Name</Text>
            <Text>{geotag.name}</Text>
          </div>
          {geotag.description && (
            <div className="geotags-new__text-row">
              <Text strong>Descripition</Text>
              <Text>{geotag.description}</Text>
            </div>
          )}
          <div className="geotags-new__text-row">
            <Text strong>Latitude</Text>
            <Text>{geotag.location.lat}</Text>
          </div>
          <div className="geotags-new__text-row">
            <Text strong>Longtitude</Text>
            <Text>{geotag.location.lng}</Text>
          </div>
          <Button
            type="primary"
            onClick={() => setIsEditing(true)}
            htmlType="button"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};
