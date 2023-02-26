import { Button, Form, Input, notification } from "antd";
import { axiosInstance, handleApiFormError, setToken } from "../../api";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser, User } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const { useForm } = Form;

type TRegister = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const Register = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [form] = useForm();

  const loadUser = async (values: TRegister) => {
    const { data } = await axiosInstance.post("users/sign-up", values);

    if (!data) {
      return;
    }

    const token = data.token;
    const user: User = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      user_id: data.user_id,
    };

    setToken(token);
    dispatch(setUser(user));
    notification.success({
      message: `Welcome, ${user.first_name} ${user.last_name}!`,
    });
  };

  const onFinish = async (values: TRegister) => {
    handleApiFormError(() => loadUser(values), form);
  };

  useEffect(() => {
    if (user) {
      navigate("/geotags");
    }
  }, [user]);

  return (
    <div className="unauthorized-app">
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
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="last_name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Plese enter valid email" },
            { required: true, message: "Please input your email!" },
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

        <Form.Item
          label="Confirm password"
          name="password_confirmation"
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
      <Link to={"/login"}>Login</Link>
    </div>
  );
};
