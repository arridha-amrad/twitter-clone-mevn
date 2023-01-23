<template>
  <h1 class="my-4 text-2xl font-bold">Comments</h1>
  <TransitionGroup name="list" tag="ul" :css="false">
    <li v-for="post in comments" :key="post.id" class="mb-3">
      <PostCard :post="post" />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { IPostWithParents } from "@/stores/types/post.types";
import { provide } from "vue";
import PostCard from "@/components/PostCard/PostCard.vue";
provide("isComment", true);
defineProps<{ comments: IPostWithParents[] }>();
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
