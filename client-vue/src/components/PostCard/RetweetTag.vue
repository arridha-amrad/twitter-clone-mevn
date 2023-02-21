<template>
  <div v-show="isRetweet" class="px-2 inline-flex gap-2 ml-9">
    <Icon class="w-4 h-4 text-gray-500 dark:text-slate-300" />
    <span class="font-bold text-gray-500 dark:text-slate-300 text-xs sm:text-sm">{{ username }} Retweeted</span>
  </div>
</template>

<script setup lang="ts">
import { Tweet } from '@/stores/types/post.types';
import { computed, toRefs } from 'vue';
import Icon from "@heroicons/vue/24/outline/ArrowPathRoundedSquareIcon";
import authStore from '@/stores/authStore';


const props = defineProps<{ tweet: Tweet }>()
const { isRetweet, user } = toRefs(props.tweet)
const store = authStore()
const username = computed(() => store.user?.id === user.value.id ? "You" : user.value.username)
</script>