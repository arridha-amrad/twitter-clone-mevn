<template>
  <div @click="navigate(post.id)" class="card border-0 w-100 mb-3" role="button">
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
        <div @click.stop="" id="post-content-action" class="d-flex gap-2 align-items-center">
          <LikePost :post="post" />
          <CommentButton :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import timeSetter from '@/utils/timeSetter';
import { computed } from 'vue';
import { IPostWithParents } from "@/stores/post.types"
import { useRouter } from "vue-router";
import LikePost from "@/features/LikePost.vue";
import CommentButton from "./CommentButton.vue";
const props = defineProps<{
  post: IPostWithParents
}>()
const date = computed(() => timeSetter(props.post.createdAt.toString()))
const avatar = computed(() => {
  const url = props.post.author.imageURL
  if (url === "default") return "/default.png"
  return url
})
const router = useRouter()
const navigate = (postId: string) => router.push(`/posts/${postId}`)
</script>