import { Wrapper } from "@googlemaps/react-wrapper";
import { Form, Input, InputNumber, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";
import { GSLabel } from "../../components/label";
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
  const navigate = useNavigate();

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

  const deleteGeotag = async (geotag_id: number) => {
    const { data } = await axiosInstance.post(
      `/users/delete-geotag?geotag_id=${geotag_id}`
    );
    notification.success({
      message: `Geotag successfully deleted!`,
    });
    navigate("/geotags");
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
    <div className="content-container">
      {isEditing ? (
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
      ) : (
        <Wrapper>
          <Map
            center={{ lat: +geotag.location.lat, lng: +geotag.location.lng }}
            zoom={8}
            style={{ flexGrow: "1", height: "500px" }}
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
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </Form>
      ) : (
        <div className="w-full md:w-1/2">
          <div className="w-full flex justify-between">
            <Text className="default-text" strong>
              Name
            </Text>
            <Text className="default-text">{geotag.name}</Text>
          </div>
          {geotag.description && (
            <div className="w-full flex justify-between">
              <Text className="default-text" strong>
                Descripition
              </Text>
              <Text className="default-text">{geotag.description}</Text>
            </div>
          )}
          <div className="w-full flex justify-between">
            <Text className="default-text" strong>
              Latitude
            </Text>
            <Text className="default-text">{geotag.location.lat}</Text>
          </div>
          <div className="w-full flex justify-between">
            <Text className="default-text" strong>
              Longtitude
            </Text>
            <Text className="default-text">{geotag.location.lng}</Text>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary mr-2"
            >
              Edit
            </button>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => deleteGeotag(geotag.geotag_id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
