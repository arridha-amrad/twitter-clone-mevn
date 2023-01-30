import axiosInstance from "@/utils/axiosInterceptor";
import { defineStore } from "pinia";
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
    async repost(postId: string) {
      try {
        await axiosInstance.post(`/posts/repost/${postId}`);
      } catch (err: any) {
        throw err.response;
      }
    },
    async deletePost(postId: string) {
      try {
        await axiosInstance.delete(`/posts/delete/${postId}`);
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.comments = this.comments.filter(
          (comment) => comment.id !== postId
        );
        this.posts[0]._count.children--;
      } catch (err: any) {
        throw err.response;
      }
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
        if (isFromDetailPage) {
          if (isComment) {
            const comment = this.comments.find(
              (post) => post.id === body.postId
            );
            if (comment) {
              comment._count.children++;
            }
          } else {
            const { parents, ...rest } = data.comment;
            this.comments.splice(0, 0, rest);
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
        const { data } = await axiosInstance.get(
          `/posts?limit=${7}&skip=${this.posts.length}`
        );
        const result = data.posts as IPostWithParentsAndChildren[];
        const oldPosts = this.posts;
        this.posts = [...oldPosts, ...result];
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
        return data.message === "like";
      } catch (err: any) {
        throw err.response;
      }
    },
  },
});

export default postStore;
