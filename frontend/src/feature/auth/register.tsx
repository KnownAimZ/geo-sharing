import { Button, Form, Input } from "antd";
import { axiosInstance, setToken } from "../../api";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser, User } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

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

  const onFinish = async (values: TRegister) => {
    const { data } = await axiosInstance.post("users/sign-up", values);
    console.log(data);
    // const data = {
    //   token: "123sfadxzxcc",
    //   last_name: "Bokii",
    //   email: "nikita.bokiy2001@gmail.com",
    //   user_id: 1,
    // };

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
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
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
    </>
  );
};
