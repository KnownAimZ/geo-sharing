import React, { useEffect } from "react";
import { axiosInstance, getToken } from "../../api";

export const Profile = () => {
  const loadProfile = async () => {
    const { data } = await axiosInstance.get(
      "/users/profile"
    );
    console.log(data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <>
      <p>Hello!</p>
    </>
  );
};
