import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, handleApiFormError } from "../../api";
const { useForm } = Form;

export const Geotag = () => {
  const [form] = useForm();
  const [geotags, setGeotags] = useState([]);

  const loadGeotags = async () => {
    getLocation();
    const { data } = await axiosInstance.get("/users/geotags");
    if (!data?.geotags) return;
    setGeotags(data.geotags);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    }
  }

  function showPosition(position: any) {
    console.log(position.coords);
  }

  const onFinish = async (values: any) => {
    handleApiFormError(() => createGeotag(values), form);
  };

  const createGeotag = async (_data: any) => {
    console.log(_data);
    const requestData = {
      name: _data.name,
      location: { lat: _data.lat, lng: _data.lng },
      description: _data.description,
    };
    console.log(requestData);

    const { data } = await axiosInstance.post(
      "/users/create-geotag",
      requestData
    );

    if (data.status === "Success") {
      loadGeotags();
    }
  };

  const deleteGeotag = async (id: number) => {
    const { data } = await axiosInstance.delete(
      `/users/delete-geotag?geotag_id=${id}`
    );
    if (!data?.geotags) return;
    setGeotags(data.geotags);
  };

  useEffect(() => {
    loadGeotags();
  }, []);

  return (
    <>
      <div>
        {geotags.map((geotag: any) => (
          <div>
            <p>{JSON.stringify(geotag)}</p>
            <Link to={`/geotag/${geotag.geotag_id}`}>Go to {geotag.name}</Link>
            <Button onClick={() => deleteGeotag(geotag.geotag_id)}>
              Delete {geotag.name}
            </Button>
          </div>
        ))}
      </div>
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
    </>
  );
};
