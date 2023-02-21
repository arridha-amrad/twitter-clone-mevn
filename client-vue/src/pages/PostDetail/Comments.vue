<template>
  <h1 class="my-4 text-2xl font-bold">Comments</h1>
  <div class="relative">
    <TransitionGroup name="post-list" tag="ul">
      <li v-for="post in comments" :key="post.id" class="mb-3">
        <PostCard :tweet="post" />
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { IPostWithParents } from "@/stores/types/post.types";
import { provide } from "vue";
import PostCard from "@/components/PostCard/PostCard.vue";
provide("isComment", true);
defineProps<{ comments: IPostWithParents[] }>();
</script>
