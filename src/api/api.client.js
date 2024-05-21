import axios from "axios";
import { BASE_URL} from "./api.constant";
import axiosInstance from "./baseService";

export const getApi = async (api) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${BASE_URL}${api}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
