import axios, { AxiosError } from "axios";
import { BASE_URL, PERSIST_STORAGE } from "./api.constant";
// import { getToast } from "../utils";
// import { TOAST_MESSAGE } from "../constants/constants";
// import { setUser } from "../redux/slices/authSlice";

const unAuthorised = [401];

const axiosInstance = axios.create({
//   timeout: 10000,
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!navigator.onLine) {
    //   return getToast("error", TOAST_MESSAGE.NO_INTERNET);
    }

    // let persisData = await localStorage.getItem(PERSIST_STORAGE);
 
    // if (persisData) {
    //   let authSlice = await JSON.parse(persisData);
    //   let authStore = await JSON.parse(authSlice?.authSlice);
    //   if (
    //     authStore?.token !== null &&
    //     authStore?.token !== undefined &&
    //     authStore?.token !== ""
    //   )
    //   {
    //     config.headers["Authorization"] = `Bearer ${authStore?.token}`;
    //   }
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error instanceof AxiosError &&
      unAuthorised.includes(error?.response?.status || 0)
    ) {
      localStorage.clear("persist:root");
      sessionStorage.clear("persist:root");
    //   setUser({
    //     token: undefined,
    //   });
      window.location.href = "/login?success=un-auth";
    } else {
      if (error?.response?.data?.error) {
        // getToast("error", error?.response?.data?.error);
      } else {
        // getToast("error", error?.response?.data?.error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
