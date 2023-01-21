<template>
  <div class="bg-white md:p-4 p-2 border rounded-t-lg">
    <div class="flex gap-4">
      <img class="avatar" :src="avatar" alt="avatar">
      <div id="post-content" class="flex-1 space-y-4">
        <div class="flex gap-2">
          <h1 class="font-bold ">{{ post.author.username }}</h1>
          <div>&bull;</div>
          <div class="flex-1">{{ date }}</div>
          <PostMenu v-show="isMyPost" :post-id="post.id" />
        </div>
        <small v-if="parents.length > 0">
          <ul class="flex flex-wrap gap-1 text-sm text-blue-500">
            Replying to
            <li :key="user" v-for="(user, index) in users">
              <span v-show="index + 1 === parents.length">and &nbsp;</span>
              <span>@{{ user }}</span>
            </li>
          </ul>
        </small>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import authStore from '@/stores/authStore';
import { IPostWithParents } from '@/stores/types/post.types';
import timeSetter from '@/utils/timeSetter';
import { computed } from 'vue';
import PostMenu from './PostMenu.vue';

const props = defineProps<{ post: IPostWithParents }>()
const uStore = authStore()
const isMyPost = computed(() => uStore.user?.id === props.post.author.id);

const parents = computed(() => props.post.parents ?? []);

const users = computed(
  () => new Set(parents.value.map((user) => user.author.username))
);

const date = computed(() => timeSetter(props.post.createdAt.toString()))
const avatar = computed(() => {
  const url = props.post.author.imageURL
  if (url === "default") return "/default.png"
  return url
})
</script>