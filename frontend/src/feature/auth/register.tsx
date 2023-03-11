import { Form, Input, notification } from "antd";
import { axiosInstance, handleApiFormError, setToken } from "../../api";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser, User } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GSLabel } from "../../components/label";

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
    <div className="full-screen-container">
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

        <Form.Item
          label={<GSLabel>Confirm password</GSLabel>}
          name="password_confirmation"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="custom-input" />
        </Form.Item>

        <div className="flex w-full items-center justify-center">
          <button className="btn-primary mr-2" type="submit">
            Register
          </button>
          <Link className="btn-secondary" to={"/login"}>
            To Login
          </Link>
        </div>
      </Form>
    </div>
  );
};
