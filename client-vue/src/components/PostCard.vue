<template>
  <article
    @click="navigate(post.id)"
    class="w-full rounded-lg border-0 bg-white px-4 py-3"
    role="button"
  >
    <div class="flex gap-4">
      <img class="avatar" :src="avatar" alt="avatar" />
      <div id="post-content" class="flex-1 space-y-2">
        <div class="flex items-center justify-start gap-2">
          <h1 class="text-sm font-bold md:text-base">
            {{ post.author.username }}
          </h1>
          <span class="text-secondary">&bull;</span>
          <div class="flex-grow text-sm">{{ date }}</div>
          <PostMenu v-show="isMyPost" :post-id="post.id" />
        </div>
        <small v-if="parents.length > 0">
          <ul class="flex flex-wrap gap-1 text-sm text-blue-500">
            Replying to
            <li :key="user" v-for="user in users">@{{ user }}</li>
          </ul>
        </small>
        <p class="">{{ post.body }}</p>
        <div id="post-content-action" class="flex items-center gap-2 -ml-2">
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
import CommentButton from "./CommentButton.vue";
import PostMenu from "./PostMenu.vue";
import authStore from "@/stores/authStore";

const userStore = authStore();

const isMyPost = computed(() => userStore.user?.id === props.post.author.id);
const parents = computed(() => props.post.parents ?? []);
const users = computed(
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
