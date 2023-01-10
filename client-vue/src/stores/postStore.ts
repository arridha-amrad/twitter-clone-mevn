import axiosInstance from "@/utils/axiosInterceptor";
import { Toast } from "bootstrap";
import { defineStore } from "pinia";
import { CreateCommentDTO, IPostWithParents } from "./types/post.types";

const liveToast = document.getElementById("liveToast");
const toast = new Toast(liveToast!);

const postStore = defineStore("post", {
  state: () => ({
    posts: [] as IPostWithParents[],
    toast,
  }),
  actions: {
    async createComment(body: CreateCommentDTO) {
      try {
        const { data } = await axiosInstance.post(
          "/posts/create-comment",
          body
        );
        const post = this.posts.find((post) => post.id === body.postId);
        if (!post) return;
        post._count.children++;
        this.posts.splice(0, 0, data.comment);
      } catch (err: any) {
        throw err.response;
      }
    },
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
