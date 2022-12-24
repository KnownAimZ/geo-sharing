import React, { useEffect } from "react";
import { axiosInstance, getToken } from "../../api";

export const Profile = () => {
  const loadProfile = async () => {
    const { data } = await axiosInstance.get(
      "/users/profile"
      // , {
      //     first_name: 'dadsgadg',
      //     last_name: 'sahsdfh',
      //     email: 'nikita.bokiy2001@gmail.com',
      //     password: '123456'
      // }
    );

    // const token = getToken();

    // console.log(token)

    // const _data = await fetch('https://3e99-5-58-52-101.ngrok.io/api/users/user-profile', {
    //     method: 'PUT',
    //     // mode: 'no-cors',
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     },
    // });
    // console.log(123)

    // const _res = _data;
    console.log(data);
    // console.log(_res);
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
