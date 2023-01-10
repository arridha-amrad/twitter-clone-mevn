import axios from "axios";

let token = "";

export const setToken = (newToken: string) => (token = newToken);

export const getToken = () => token;

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // @ts-ignore
    config.headers!["authorization"] = getToken();
    // @ts-ignore
    config.headers!["Content-Type"] = "application/json";
    return config;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err?.response?.status === 401) {
      try {
        const prevRequest = err.config;
        const { data } = await axiosInstance.get("/user/refresh-token");
        setToken(data.token);
        prevRequest.headers["authorization"] = data.token;
        return axiosInstance(prevRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
