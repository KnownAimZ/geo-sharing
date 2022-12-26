import axios from "axios";

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
