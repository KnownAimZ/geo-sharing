import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { axiosInstance, handleApiFormError, setToken } from "../../api";
import { setUser, User } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { GSLabel } from "../../components/label";
import GeoShareLogo from "../../assets/geo-sharing.jpg";

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
    <>
      <img className="block md:hidden w-full h-full fixed" src={GeoShareLogo} />
      <div className="full-screen-container gap-8">
        <div className="flex flex-col w-full md:w-96 mx-4 md:mx-0 p-4 md:p-0 rounded-md bg-white dark:bg-black z-10">
          <div className="flex w-full items-center justify-between mb-8">
            <span className="default-text text-2xl font-semibold">
              👋 Login to App
            </span>
            <Link className="btn-secondary whitespace-nowrap" to={"/register"}>
              To Register
            </Link>
          </div>
          <Form
            className="rounded-md p-8 border"
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                className="custom-input"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <div className="flex flex-col w-full items-center justify-center">
              <button className="btn-primary mr-2 w-full" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
        <img
          className="hidden md:block object-cover h-5/6 w-2/6 rounded-3xl"
          src={GeoShareLogo}
        />
      </div>
    </>
  );
};
