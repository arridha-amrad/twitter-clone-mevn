<template>
  <TransitionGroup name="list" :css="false" tag="ul">
    <li v-for="(post) in store.posts" :key="post.id">
      <PostCard class="mt-4" :post="post" />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import PostCard from "@/components/PostCard/PostCard.vue";
import postStore from "@/stores/postStore";
import { onMounted } from "vue";

const store = postStore();

onMounted(async () => {
  try {
    await store.getPosts();
  } catch (err) { }
});
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

.list-leave-active {
  position: absolute;
}
</style>
