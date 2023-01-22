import { Button, Form, Input, notification } from "antd";
import React, { useEffect } from "react";
import { axiosInstance, handleApiFormError } from "../../api";
import { useAppDispatch } from "../../hooks";
import { setUser, User } from "../auth/authSlice";
import { Logout } from "../auth/logout";
const { useForm } = Form;

export const Profile = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const loadProfile = async () => {
    const { data } = await axiosInstance.get("/users/profile");
    form.setFieldsValue(data);
  };

  const updateProfile = async (_data: any) => {
    const { data } = await axiosInstance.put("/users/update-profile", _data);
    if (!data) {
      return;
    }

    const user: User = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      user_id: data.user_id,
    };

    dispatch(setUser(user));
    form.setFieldsValue(data);
    notification.success({ message: "Profile updated!" });
  };

  const onFinish = async (values: any) => {
    handleApiFormError(() => updateProfile(values), form);
  };

  useEffect(() => {
    loadProfile();
  }, []);

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
          label="First name"
          name="first_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="last_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Plese enter valid email" },
            { required: true, message: "Please input your username!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Logout />
    </>
  );
};
