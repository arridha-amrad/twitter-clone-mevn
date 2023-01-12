import axiosInstance from "@/utils/axiosInterceptor";
import { Toast } from "bootstrap";
import { defineStore } from "pinia";
import {
  CreateCommentDTO,
  IPostWithParentsAndChildren,
} from "./types/post.types";

const liveToast = document.getElementById("liveToast");
const toast = new Toast(liveToast!);

const postStore = defineStore("post", {
  state: () => ({
    posts: [] as IPostWithParentsAndChildren[],
    toast,
  }),
  actions: {
    resetPost() {
      this.posts = [];
    },
    setPost(post: IPostWithParentsAndChildren) {
      this.posts.push(post);
    },
    async getChildren(postId: string) {
      try {
        const { data } = await axiosInstance.get(`/posts/children/${postId}`);
        return data.children;
      } catch (err: any) {
        throw err.response;
      }
    },
    async getOnePost(postId: string) {
      try {
        const { data } = await axiosInstance.get(`/posts/detail/${postId}`);
        this.posts = [];
        this.posts.push(data.post);
        return data.post;
      } catch (err: any) {
        throw err.response;
      }
    },
    async createComment(body: CreateCommentDTO, isFromDetailPage = false) {
      try {
        const { data } = await axiosInstance.post(
          "/posts/create-comment",
          body
        );
        if (isFromDetailPage) {
          this.posts[0].children.splice(0, 0, data.comment);
        } else {
          const post = this.posts.find((post) => post.id === body.postId);
          if (!post) return;
          post._count.children++;
          this.posts.splice(0, 0, data.comment);
        }
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
        return data;
      } catch (err: any) {
        throw err.response;
      }
    },
  },
});

export default postStore;
