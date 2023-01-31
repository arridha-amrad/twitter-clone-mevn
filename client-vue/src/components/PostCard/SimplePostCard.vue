<template>
  <div class="bg-white dark:bg-slate-800 md:p-4 p-2 rounded-t-lg">
    <div class="flex gap-4">
      <Avatar :url="avatar" />
      <div id="post-content" class="flex-1 space-y-4">
        <div class="flex gap-2 items-center">
          <h1 class="font-bold">{{ post.author.username }}</h1>
          <div>&bull;</div>
          <div class="flex-1 sm:text-sm text-xs text-gray-500 dark:text-gray-200">{{ date }}</div>
        </div>
        <ParentPostAuthor :users="users" />
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import authStore from "@/stores/authStore";
import { IPostWithParents } from "@/stores/types/post.types";
import timeSetter from "@/utils/timeSetter";
import { computed } from "vue";
import Avatar from "../Avatar.vue";
import ParentPostAuthor from "./ParentPostAuthor.vue";

const props = defineProps<{ post: IPostWithParents }>();
const uStore = authStore();
const isMyPost = computed(() => uStore.user?.id === props.post.author.id);

const parents = computed(() => props.post.parents ?? []);

const users = computed(
  () => new Set(parents.value.map((user) => user.author.username))
);

const date = computed(() => timeSetter(props.post.createdAt.toString()));
const avatar = computed(() => {
  const url = props.post.author.imageURL;
  if (url === "default") return "/default.png";
  return url;
});
</script>
