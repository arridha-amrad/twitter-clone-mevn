<template>
  <div class="card border w-100 rounded-bottom-0">
    <div class="card-body d-flex gap-3 align-items-start">
      <img class="avatar rounded-circle border" :src="avatar" alt="avatar">
      <div id="post-content" class="flex-fill">
        <div class="d-flex align-items-center gap-2 text-black-50 fs-6">
          <div class="fw-bold ">{{ post.author.username }}</div>
          <div class="">{{ date }}</div>
        </div>
        <p class="card-text">{{ post.body }}</p>
        <div class="d-flex align-items-center justify-content-between w-100">
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { IPost } from '@/stores/types/post.types';
import timeSetter from '@/utils/timeSetter';
import { computed } from 'vue';

const props = defineProps<{ post: IPost }>()

const date = computed(() => timeSetter(props.post.createdAt.toString()))
const avatar = computed(() => {
  const url = props.post.author.imageURL
  if (url === "default") return "/default.png"
  return url
})
</script>