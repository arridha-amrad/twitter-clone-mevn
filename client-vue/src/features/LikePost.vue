<template>
  <button @click="like" :class="['btn', 'btn-sm', likeBtn]">{{ post._count.likes }} Like</button>

</template>

<script setup lang="ts">
import { IPostWithParents } from '@/stores/types/post.types';
import postStore from '@/stores/postStore';
import { computed } from 'vue';
const props = defineProps<{ post: IPostWithParents }>()
const store = postStore()
const like = async () => {
  try {
    await store.likePost(props.post.id)
  } catch (err) {
  }
}
const likeBtn = computed(() => props.post.isLiked ? "btn-danger" : "btn-outline-danger")
</script>