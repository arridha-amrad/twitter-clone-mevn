<template>

  <PostCard v-for="post in store.posts" class="mt-4" :post="post" :key="post.id" />

</template>

<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import postStore from '@/stores/postStore';
import { onMounted } from 'vue';

const store = postStore()

onMounted(async () => {
  try {
    await store.getPosts()
  } catch (err) {
  }
})
</script>

