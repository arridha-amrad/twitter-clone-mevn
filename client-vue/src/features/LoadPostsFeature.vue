<template>
  <ul>
    <li v-for="post in store.posts">
      <PostCard class="mt-4" :post="post" :key="post.id" />
    </li>
  </ul>
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

