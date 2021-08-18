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
  return  {...config,params :{ ...config.params,pageSize : 5,apiKey : "96f29912297946b4b6ddb34d971579f5"}};
});

apiClient.interceptors.response.use(response => {
  return response.data;
});
