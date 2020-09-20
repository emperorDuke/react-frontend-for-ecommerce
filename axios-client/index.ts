import { default as ax } from "axios";
import { BEARER } from "../redux/utils/constants";

/**
 *  axios
 */
export default function axiosClient(token?: string) {
  const axios = ax.create();

  axios.interceptors.request.use((config) => {
    config.headers["Authorization"] = `${BEARER} ${token}`;
    config.headers["Content-type"] = "application/json";
    return config;
  });

  return axios;
}
