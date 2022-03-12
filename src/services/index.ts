import axios, { AxiosRequestConfig } from "axios";

const isTest = process.env.NODE_ENV === "test";

const BASE_URL = isTest
  ? "http://127.0.0.1:8000/gateway"
  : "http://10.76.0.166:8000/gateway";

const instance = axios.create({
  baseURL: BASE_URL,
});

const httpRequest = {
  get(url: string, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, config ?? {})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, config ?? {})
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export { httpRequest, BASE_URL };
