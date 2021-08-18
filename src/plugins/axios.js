import axios from "axios";
// import Nprogress from "nprogress";

export const apiClient = axios.create({
  baseURL: "https://news-api-abiodun.herokuapp.com/",
  headers: {
    Accept: "application/json",
  }
});
apiClient.interceptors.request.use(config => {
  if(!config.url.startsWith("/")){
    return config
  } 
  return  {...config,params :{ ...config.params,pageSize : 5,apiKey : "11cc01263f944b71af3311a37b02d63b"}};
});

apiClient.interceptors.response.use(response => {
  return response.data;
});
