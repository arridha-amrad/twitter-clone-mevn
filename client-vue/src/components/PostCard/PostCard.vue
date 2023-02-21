<template>
  <article @click="navigate(tweet.id)"
    class="w-full h-fit box-border rounded-lg border-0 bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-600 dark:hover:bg-opacity-50 md:px-4 md:py-3 px-3 py-1.5"
    role="button">
    <RetweetTag :tweet="tweet" />
    <div class="flex sm:gap-4 gap-2">
      <Avatar :url="avatar" />
      <div id="post-content" class="flex-1">
        <div class="flex items-center justify-start gap-2">
          <h1 class="text-sm font-bold md:text-base">
            {{ author.username }}
          </h1>
          <span class="text-secondary">&bull;</span>
          <div class="text-sm flex-1">{{ date }}</div>
          <PostMenu v-show="isMyPost" :post-id="id" />
        </div>
        <ParentPostAuthor :users="parentPostsAuthor" />
        <p class="text-gray-500 dark:text-gray-300 sm:text-base text-sm">
          {{ body }}
        </p>
        <PostCardCarousel ref="carouselRef" :urls="urls" />
        <div class="flex items-center w-3/4 justify-between gap-4 mt-5">
          <LikePostButton :tweet="tweet" />
          <RetweetButton :post="tweet.post" />
          <CommentButton :post="tweet.post" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import timeSetter from "@/utils/timeSetter";
import { computed, toRefs } from "vue";
import { Tweet } from "@/stores/types/post.types";
import { useRouter } from "vue-router";
import LikePostButton from "@/features/LikePostFeature.vue";
import CommentButton from "../CommentButton.vue";
import PostMenu from "./PostCardMenu.vue";
import authStore from "@/stores/authStore";
import ParentPostAuthor from "./ParentPostAuthor.vue";
import Avatar from "../Avatar.vue";
import RetweetButton from "@/features/ReTweetFeature.vue";
import PostCardCarousel from "./PostCardCarousel.vue";
import RetweetTag from "./RetweetTag.vue";

const props = defineProps<{ tweet: Tweet }>();

const { createdAt, medias, author, parents, id, isRetweet, body } = toRefs(
  props.tweet.post
);

const userStore = authStore();

const isMyPost = computed(() => userStore.user?.id === author.value.id);

const parentPostsAuthor = computed(
  () => new Set(props.tweet.post.parents.map((user) => user.author.username))
);

const urls = computed(() => medias.value.map((m) => m.url));

const date = computed(() => timeSetter(createdAt.value.toString()));

const avatar = computed(() => {
  const url = author.value.imageURL;
  return url === "default" ? "/default.png" : url;
});
const router = useRouter();
const navigate = (postId: string) => router.push(`/posts/${postId}`);
</script>
