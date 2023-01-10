import axiosInstance from "@/utils/axiosInterceptor";

import { defineStore } from "pinia";
import { IPostWithParents } from "./post.types";

const postStore = defineStore("post", {
  state: () => ({
    posts: [] as IPostWithParents[],
  }),
  actions: {
    async getPosts() {
      try {
        const { data } = await axiosInstance.get("/posts");
        this.posts = data.posts;
      } catch (err: any) {
        throw err.response;
      }
    },
    async createPost(body: string) {
      try {
        const { data } = await axiosInstance.post("/posts/create-post", {
          body,
        });
        console.log("data : ", data);
        this.posts.splice(0, 0, data.post);
      } catch (err: any) {
        throw err.response;
      }
    },
  },
});

export default postStore;
