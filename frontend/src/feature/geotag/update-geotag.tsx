import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";

const { useForm } = Form;

export const UpdateGeotag = () => {
  const [form] = useForm();
  const { id } = useParams();
  const [geotag, setGeotag] = useState<any>(null);

  const loadGeotag = async () => {
    const { data } = await axiosInstance.get(
      `/users/show-geotag?geotag_id=${id}`
    );
    if (!data?.geotags.length) return;
    const _geotag = data.geotags[0];
    setGeotag(_geotag);
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
  };

  const updateForm = () => {
    if (!geotag) return;
    const _geotag = {
      ...geotag,
      lat: geotag.location.lat,
      lng: geotag.location.lng,
    };
    form.setFieldsValue(_geotag);
  };

  useEffect(() => {
    if (!id) return;
    loadGeotag();
  }, [id]);

  useEffect(() => {
    if (!geotag) return;
    updateForm();
  }, [geotag]);

  if (!geotag) return null;

  return (
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
  );
};
