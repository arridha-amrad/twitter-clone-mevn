import axiosInstance from "@/utils/axiosInterceptor";

import { defineStore } from "pinia";
import { IPostWithParents } from "./types/post.types";

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
        this.posts.splice(0, 0, data.post);
      } catch (err: any) {
        throw err.response;
      }
    },
    async likePost(postId: string) {
      try {
        const { data } = await axiosInstance.post("/posts/like-post", {
          postId,
        });
        const post = this.posts.find((post) => post.id === postId);
        if (!post) return;
        post.isLiked = !post.isLiked;
        if (data.message === "like") {
          post._count.likes++;
        } else {
          post._count.likes--;
        }
      } catch (err: any) {
        throw err.response;
      }
    },
  },
});

export default postStore;
