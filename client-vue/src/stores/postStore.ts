import axiosInstance from "@/utils/axiosInterceptor";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  CreateCommentDTO,
  IPostWithParents,
  IPostWithParentsAndChildren,
} from "./types/post.types";

const postStore = defineStore("post", {
  state: () => ({
    posts: [] as IPostWithParentsAndChildren[],
    comments: [] as IPostWithParents[],
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
        this.comments = data.children;
      } catch (err: any) {
        throw err.response;
      }
    },
    async getOnePost(postId: string) {
      try {
        const { data } = await axiosInstance.get(`/posts/detail/${postId}`);
        this.posts = [];
        this.posts.push(data.post);
        this.comments = data.post.children;
      } catch (err: any) {
        throw err.response;
      }
    },
    async createComment(
      body: CreateCommentDTO,
      isFromDetailPage = false,
      isComment = false
    ) {
      try {
        const { data } = await axiosInstance.post(
          "/posts/create-comment",
          body
        );
        console.log("isComment : ", isComment);

        if (isFromDetailPage) {
          if (isComment) {
            const comment = this.comments.find(
              (post) => post.id === body.postId
            );
            if (!comment) return;
            comment._count.children++;
          } else {
            this.comments.splice(0, 0, data.comment);
            this.posts[0]._count.children++;
          }
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
    async likePost(postId: string, isComment = false) {
      try {
        const { data } = await axiosInstance.post("/posts/like-post", {
          postId,
        });
        const post = isComment
          ? this.comments.find((post) => post.id === postId)
          : this.posts.find((post) => post.id === postId);
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
