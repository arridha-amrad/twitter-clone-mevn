<template>
  <article @click="navigate(post.id)"
    class="w-full h-full box-border rounded-lg border-0 bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-600 dark:hover:bg-opacity-50 md:px-4 md:py-3 px-3 py-1.5"
    role="button">
    <div class="flex sm:gap-4 gap-2">
      <Avatar :url="avatar" />
      <div id="post-content" class="flex-1">
        <div class="flex items-center justify-start gap-2">
          <h1 class="text-sm font-bold md:text-base">
            {{ post.author.username }}
          </h1>
          <span class="text-secondary">&bull;</span>
          <div class="text-sm flex-1">{{ date }}</div>
          <PostMenu v-show="isMyPost" :post-id="post.id" />
        </div>
        <ParentPostAuthor :users="authors" />
        <p class="text-gray-500 dark:text-gray-300 sm:text-base text-sm">{{ post.body }}</p>
        <PostMedia :urls="urls" />
        <div class="flex items-center w-3/4 justify-between gap-4 mt-5">
          <LikePostButton :post="post" />
          <RePostButton :post="post" />
          <CommentButton :post="post" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import timeSetter from "@/utils/timeSetter";
import { computed } from "vue";
import { IPostWithParents } from "@/stores/types/post.types";
import { useRouter } from "vue-router";
import LikePostButton from "@/features/LikePostFeature.vue";
import CommentButton from "../CommentButton.vue";
import PostMenu from "./PostCardMenu.vue";
import authStore from "@/stores/authStore";
import ParentPostAuthor from "./ParentPostAuthor.vue";
import Avatar from "../Avatar.vue";
import RePostButton from "@/features/RePostFeature.vue";
import PostMedia from "../PostMedia.vue";

const userStore = authStore();

const isMyPost = computed(() => userStore.user?.id === props.post.author.id);

const parents = computed(() => props.post.parents ?? []);

const authors = computed(
  () => new Set(parents.value.map((user) => user.author.username))
);

const urls = computed(() => props.post.medias.map((m) => m.url))

const props = defineProps<{
  post: IPostWithParents;
}>();

const date = computed(() => timeSetter(props.post.createdAt.toString()));

const avatar = computed(() => {
  const url = props.post.author.imageURL;
  return url === "default" ? "/default.png" : url;
});

const router = useRouter();
const navigate = (postId: string) => router.push(`/posts/${postId}`);
</script>
