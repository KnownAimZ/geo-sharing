import { useEffect } from "react";
import { axiosInstance } from "../../api";

export const Geotag = () => {
  const loadGeotags = async () => {
    const { data } = await axiosInstance.get("/users/geotags");
    console.log(data);
  };

  useEffect(() => {
    loadGeotags();
  }, []);

  return <></>;
};
