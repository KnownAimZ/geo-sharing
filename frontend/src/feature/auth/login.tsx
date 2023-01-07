import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  axiosInstance,
  handleApiFormError,
  setToken,
} from "../../api";
import { setUser, User } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

type TLogin = {
  email: string;
  password: string;
};

// type TLoginResponse

export const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [form] = useForm();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const loginUser = async (values: TLogin) => {
    const { data } = await axiosInstance.post("/users/login", values);

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
      message: `Welcome back, ${user.first_name} ${user.last_name}!`,
    });
  };

  const onFinish = async (values: any) => {
    handleApiFormError(() => loginUser(values), form);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Plese enter valid email" },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Link to={"/register"}>Register</Link>
    </>
  );
};
