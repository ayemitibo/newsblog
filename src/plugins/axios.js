import axios from "axios";
// import Nprogress from "nprogress";

export const apiClient = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Accept: "application/json",
    'X-Api-Key' : '96ef503dc8664873a3299cab06b09f86',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers" : "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  }
});
apiClient.interceptors.request.use(config => {
  return config;
});

apiClient.interceptors.response.use(response => {
  return response.data;
});
