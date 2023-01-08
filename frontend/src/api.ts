import { FormInstance, notification } from "antd";
import axios, { AxiosError } from "axios";

export type Response<T extends Record<string, string | number>> = T & {
  message: string;
  status: string;
};

export type ErrorResponse = {
  errors: ApiError;
  message: string;
};

export type ApiError = {
  [field: string]: string[];
};

export const GOOGLE_MAP_API_KEY = "AIzaSyB0sb9WA8KR-j-StEjKY8y4V-cTK9sxh-E";

const baseURL = "http://localhost:80/api/";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return token;
};

export const setToken = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getAuthorizationHeader = () => {
  const token = getToken();
  if (!token) return;
  return `Bearer ${getToken()}`;
};

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    ...(getAuthorizationHeader()
      ? { Authorization: getAuthorizationHeader() }
      : {}),
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export const handleApiFormError = async (
  callback: () => void,
  form: FormInstance
) => {
  try {
    await callback();
  } catch (error: Error | AxiosError) {
    if (!axios.isAxiosError(error)) {
      notification.error({ message: "Oops, something went wrong!" });
      return;
    }
    const _data = error.response?.data as ErrorResponse;
    console.log(_data);
    const errorNames = Object.keys(_data.errors);
    if (
      !errorNames.length ||
      (errorNames.length === 1 && errorNames.includes("error"))
    ) {
      notification.error({ message: _data.message });
      return;
    }
    const formattedErrors = Object.entries(_data.errors).map(
      ([name, value]) => ({ name: name, errors: value })
    );
    form.setFields(formattedErrors);
  }
};
