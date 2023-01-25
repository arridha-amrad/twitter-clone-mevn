import axiosInstance, { setToken } from "@/utils/axiosInterceptor";
import { defineStore } from "pinia";
import { LoginDTO, RegisterDTO, User } from "./types/user.types";

const authStore = defineStore("auth", {
  state: () => ({
    isLoading: true,
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
  },
  actions: {
    async getLoginUser() {
      try {
        const { data } = await axiosInstance.get("/user/me");
        this.user = data.user;
      } catch (err: any) {
        throw err.response;
      } finally {
        this.isLoading = false;
      }
    },
    register: async (body: RegisterDTO) => {
      try {
        const { data } = await axiosInstance.post("/user/register", body);
        return data;
      } catch (err: any) {
        throw err.response;
      }
    },
    async login(body: LoginDTO) {
      try {
        const { data } = await axiosInstance.post("/user/login", body);
        setToken(data.token);
        this.user = data.user;
        return data;
      } catch (err: any) {
        throw err.response;
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        await axiosInstance.get("/user/logout");
        this.user = null;
      } catch (err: any) {
        throw err.response;
      }
    },
  },
});

export default authStore;
