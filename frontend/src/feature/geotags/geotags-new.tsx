import { Button, Form, Input, notification } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";
const { useForm } = Form;

export const GeotagsNew = () => {
  const [form] = useForm();

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

  return (
    <>
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
      <Link to={"/geotags"}>To geotags</Link>
    </>
  );
};
