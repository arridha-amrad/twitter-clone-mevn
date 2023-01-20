<template>
  <div @click="navigate(post.id)" class="bg-white px-4 py-3 rounded-lg border-0 w-full" role="button">
    <div class="flex gap-4">
      <img class="w-14 h-14 rounded-full border-2" :src="avatar" alt="avatar">
      <div id="post-content" class="flex-1 space-y-2">
        <div class="flex justify-start gap-2 items-center">
          <h1 class="font-bold text-sm md:text-base">{{ post.author.username }}</h1>
          <span class="text-secondary">&bull;</span>
          <div class="flex-grow text-sm">{{ date }}</div>
          <PostMenu v-show="isMyPost" :post-id="post.id" />
        </div>
        <small v-if="parents.length > 0">
          <ul class="flex flex-wrap text-sm text-blue-500">
            Replying to
            <li v-for="user in users">
              @{{ user }}
            </li>
          </ul>
        </small>
        <p class="card-text">{{ post.body }}</p>
        <div @click.stop="" id="post-content-action" class="d-flex gap-2 align-items-center">
          <LikePostButton :post="post" />
          <CommentButton :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import timeSetter from '@/utils/timeSetter';
import { computed } from 'vue';
import { IPostWithParents } from "@/stores/types/post.types"
import { useRouter } from "vue-router";
import LikePostButton from "@/features/LikePostFeature.vue";
import CommentButton from "./CommentButton.vue";
import PostMenu from './PostMenu.vue';
import authStore from '@/stores/authStore';

const userStore = authStore()

const isMyPost = computed(() => userStore.user?.id === props.post.author.id)
const parents = computed(() => props.post.parents ?? [])
const users = computed(() => new Set(parents.value.map((user) => user.author.username)))

const props = defineProps<{
  post: IPostWithParents,
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