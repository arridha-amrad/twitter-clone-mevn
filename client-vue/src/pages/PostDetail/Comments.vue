<template>
  <h1 class="my-4 text-2xl font-bold">Comments</h1>
  <div v-for="post in comments">
    <PostCard :post="post" :key="post.id" />
  </div>
</template>

<script setup lang="ts">
import { IPostWithParents } from '@/stores/types/post.types';
import { provide } from 'vue';
import PostCard from '@/components/PostCard.vue';
provide('isComment', true)
defineProps<{ comments: IPostWithParents[] }>()
</script>