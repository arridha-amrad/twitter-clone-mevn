<template>
  <ul class="mt-5">
    <li v-for="post in store.posts">
      <PostCard :post="post" />
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

