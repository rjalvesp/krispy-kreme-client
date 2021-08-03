import axios from "axios";
import { getAuthToken } from "./UserService";

const getAxiosInstance = (params) => {
  const { url, version = "" } = params;
  const api = axios.create({
    baseURL: `${url}/${version}`,
    timeout: 60000,
  });

  api.interceptors.request.use(async (reqConfig) => {
    const updatedReqConfig = { ...reqConfig };
    const authToken = await getAuthToken();
    if (authToken) {
      updatedReqConfig.headers.authorization = `Bearer ${authToken}`;
    }

    return updatedReqConfig;
  });

  return api;
};

export const api = getAxiosInstance({
  url: process.env.REACT_APP_API_URL,
  version: "v1",
});
