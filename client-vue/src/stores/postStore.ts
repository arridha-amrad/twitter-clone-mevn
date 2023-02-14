import axiosInstance from "@/utils/axiosInterceptor";
import { defineStore } from "pinia";
import {
  CreateCommentDTO,
  IPostWithParents,
  ITweet,
  Tweet,
} from "./types/post.types";
import uiStore from "./uiStore";

const uS = uiStore();

const postStore = defineStore("post", {
  state: () => ({
    tweets: [] as Tweet[],
    comments: [] as IPostWithParents[],
  }),
  actions: {
    async repost(postId: string) {
      try {
        const { data } = await axiosInstance.post<{
          message: string;
          tweet: ITweet;
        }>(`/posts/repost/${postId}`);
        const tweet = this.tweets.find((tweet) => tweet.postId === postId);
        if (!tweet) return;
        if (data.message === "reTweet") {
          tweet.post.isRetweet = true;
          tweet.post._count.tweets++;
          const newTweet: Tweet = { ...data.tweet, post: tweet.post };
          this.tweets.splice(0, 0, newTweet);
        } else {
          tweet.post.isRetweet = false;
          tweet.post._count.tweets--;
          this.tweets = this.tweets.filter((tweet) => {
            tweet.id !== data.tweet.id;
          });
        }
      } catch (err: any) {
        throw err.response;
      }
    },
    async deletePost(postId: string) {
      try {
        uS.setLoading();
        await axiosInstance.delete(`/posts/delete/${postId}`);
        uS.setToast("post deleted");
        this.tweets = this.tweets.filter((tweet) => tweet.postId !== postId);
        this.comments = this.comments.filter(
          (comment) => comment.id !== postId
        );
        this.tweets[0].post._count.children--;
      } catch (err: any) {
        throw err.response;
      } finally {
        setTimeout(() => {
          uS.unsetLoading();
        }, 300);
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
        this.tweets = [];
        this.tweets.push(data.tweet);
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
        const { data } = await axiosInstance.post<{ tweet: Tweet }>(
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
            // const { parents, ...rest } = data.comment;
            this.comments.splice(0, 0, data.tweet.post);
            this.tweets[0].post._count.children++;
          }
        } else {
          const tweet = this.tweets.find(
            (tweet) => tweet.postId === body.postId
          );
          if (!tweet) return;
          tweet.post._count.children++;
          this.tweets.splice(0, 0, data.tweet);
        }
      } catch (err: any) {
        throw err.response;
      }
    },
    async getPosts() {
      try {
        const { data } = await axiosInstance.get<{ tweets: Tweet[] }>(
          `/posts?limit=${7}&skip=${this.tweets.length}`
        );
        const result = data.tweets as Tweet[];
        this.tweets = [...this.tweets, ...result];
      } catch (err: any) {
        throw err.response;
      }
    },
    async createPost(formData: FormData) {
      try {
        const { data } = await axiosInstance.post<{ tweet: Tweet }>(
          "/posts/create-post",
          formData
        );
        this.tweets.splice(0, 0, data.tweet);
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
