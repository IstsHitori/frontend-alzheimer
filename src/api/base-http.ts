import axios, { type AxiosInstance } from "axios";

const getAuthToken = (): string | null => localStorage.getItem("authToken");

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_NEST_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiPython: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_IA_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const PUBLIC_PATHS = ["/auth/login"];

  const isPublicPath = PUBLIC_PATHS.some((path) => config.url?.includes(path));

  if (!isPublicPath) {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

