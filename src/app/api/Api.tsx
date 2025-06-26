import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {dismissAlert} from "@/app/helpers/Alert";
// import { store } from "@/app/redux/store";
// import {setLoading} from "@/app/redux/slices/LoadingSlice";

export type ApiResponse<T = null> = AxiosResponse<BaseApiResponse<T>>;

interface BaseApiResponse<T> {
  status_code: number;
  message: string;
  data: T | null;
  error?: Array<string>
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_BASE_URL,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // store.dispatch(setLoading(true));
    // console.log('request >>>>>> ', store.getState().loading)
    /*const accessToken: string | null = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }*/
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // console.log('response >>>>>> ', store.getState().loading)
    // store.dispatch(setLoading(false));
    return response
  },
  async (error) => {
    // store.dispatch(setLoading(false));
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //eg. redirect to login
      return api(originalRequest);
    }
    dismissAlert()
    return Promise.reject(error);
  }
);

export default api;
