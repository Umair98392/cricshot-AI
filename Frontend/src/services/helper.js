import axios from "axios";
import { getToken } from "../auth";


const apiUrl = process.env.Backend_Secret_Api_Url;


export const BASE_URL = apiUrl;

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
    async(config) => {
      const token = await getToken();
      if (token) {
        config.headers = config.headers || {}; // Ensure headers object is defined
        config.headers.Authorization = `Bearer ${token}`; // Set the 'Authorization' header
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
