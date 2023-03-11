import { Form, Input, notification } from "antd";
import React, { useEffect } from "react";
import { axiosInstance, handleApiFormError } from "../../api";
import { GSLabel } from "../../components/label";
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
    <div className="content-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label={<GSLabel>First name</GSLabel>}
          name="first_name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item
          label={<GSLabel>Last name</GSLabel>}
          name="last_name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item
          label={<GSLabel>Email</GSLabel>}
          name="email"
          rules={[
            { type: "email", message: "Plese enter valid email" },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item
          label={<GSLabel>Password</GSLabel>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="custom-input" />
        </Form.Item>

        <div className="flex w-full items-center justify-center">
          <button type="submit" className="btn-primary mr-2">
            Submit
          </button>
          <Logout />
        </div>
      </Form>
    </div>
  );
};
