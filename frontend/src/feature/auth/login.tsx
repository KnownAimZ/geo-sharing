import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { axiosInstance, handleApiFormError, setToken } from "../../api";
import { setUser, User } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { GSLabel } from "../../components/label";

type TLogin = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [form] = useForm();

  useEffect(() => {
    if (user) {
      navigate("/geotags");
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
    <div className="full-screen-container">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label={<GSLabel>Email</GSLabel>}
          name="email"
          rules={[
            { type: "email", message: "Plese enter valid email" },
            { required: true, message: "Please input your email!" },
          ]}
        >
          <Input className="custom-input" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label={<GSLabel>Password</GSLabel>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="custom-input" prefix={<LockOutlined />} />
        </Form.Item>

        <div className="flex w-full items-center justify-center">
          <button className="btn-primary mr-2" type="submit">
            Login
          </button>
          <Link className="btn-secondary" to={"/register"}>
            To Register
          </Link>
        </div>
      </Form>
    </div>
  );
};
