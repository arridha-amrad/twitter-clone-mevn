<template>
  <article @click="navigate(post.id)"
    class="w-full rounded-lg border-0 bg-white dark:bg-slate-800 md:px-4 md:py-3 px-3 py-1.5" role="button">
    <div class="flex sm:gap-4 gap-2">
      <img class="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-gray-100 dark:border-slate-600"
        :src="avatar" alt="avatar" />
      <div id="post-content" class="flex-1 sm:space-y-2 space-y-1">
        <div class="flex items-center justify-start gap-2">
          <h1 class="text-sm font-bold md:text-base">
            {{ post.author.username }}
          </h1>
          <span class="text-secondary">&bull;</span>
          <div class="text-sm flex-1">{{ date }}</div>
          <PostMenu class="" v-show="isMyPost" :post-id="post.id" />
        </div>
        <ParentPostAuthor :users="authors" />
        <p class="text-gray-500 dark:text-gray-300 sm:text-sm text-xs">{{ post.body }}</p>
        <div id="post-content-action" class="flex items-center justify-start gap-4">
          <LikePostButton :post="post" />
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

const userStore = authStore();

const isMyPost = computed(() => userStore.user?.id === props.post.author.id);

const parents = computed(() => props.post.parents ?? []);

const authors = computed(
  () => new Set(parents.value.map((user) => user.author.username))
);

const props = defineProps<{
  post: IPostWithParents;
}>();
const date = computed(() => timeSetter(props.post.createdAt.toString()));
const avatar = computed(() => {
  const url = props.post.author.imageURL;
  if (url === "default") return "/default.png";
  return url;
});
const router = useRouter();
const navigate = (postId: string) => router.push(`/posts/${postId}`);
</script>
