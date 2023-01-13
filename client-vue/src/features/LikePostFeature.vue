<template>
  <button @click="like" :class="['btn', 'btn-sm', likeBtn]">{{ likeObj.totalLikes }} Like</button>
</template>

<script setup lang="ts">
import { IPostWithParents } from '@/stores/types/post.types';
import postStore from '@/stores/postStore';
import { computed, reactive } from 'vue';
const props = defineProps<{ post: IPostWithParents }>()

const likeObj = reactive({
  isLiked: props.post.isLiked,
  totalLikes: props.post._count.likes
})
const store = postStore()

const like = async () => {
  try {
    const isLiked = await store.likePost(props.post.id)
    likeObj.isLiked = isLiked
    isLiked ? likeObj.totalLikes++ : likeObj.totalLikes--
  } catch (err) {
  }
}

const likeBtn = computed(() => likeObj.isLiked ? "btn-danger" : "btn-outline-danger")
</script>