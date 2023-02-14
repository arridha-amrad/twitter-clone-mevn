<template>
  <div class="relative">
    <TransitionGroup tag="ul" name="post-list" :css="false">
      <li v-for="(tweet) in store.tweets" :key="tweet.id">
        <PostCard class="mt-4" :post="tweet.post" />
      </li>
    </TransitionGroup>
  </div>
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
