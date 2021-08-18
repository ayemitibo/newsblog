import axios from "axios";
// import Nprogress from "nprogress";

export const apiClient = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Accept: "application/json",
    'X-Api-Key' : 'e0b79716b80a4355a9f5a8df0ceaf8c2',
  }
});
apiClient.interceptors.request.use(config => {
  if(!config.url.startsWith("/")){
    return config
  } 
  return  {...config,params :{ ...config.params,pageSize : 5}};
});

apiClient.interceptors.response.use(response => {
  return response.data;
});
