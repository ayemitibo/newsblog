import axios from "axios";
// import Nprogress from "nprogress";

export const apiClient = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Accept: "application/json"
  }
});
apiClient.interceptors.request.use(config => {
  return config;
});

apiClient.interceptors.response.use(response => {
  return response.data;
});
