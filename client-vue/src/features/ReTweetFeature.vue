<template>
  <Tooltip class="group" :tip="post.isRetweet ? 'unRetweet' : 'Retweet'">
    <button class="flex relative items-center gap-1 sm:text-sm text-xs font-medium" @click.stop="repost">
      <span>
        <Icon v-if="post.isRetweet" class="w-5 h-5 text-green-500 dark:text-green-600" />
        <Icon v-else class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-green-500" />
      </span>
      <CountLabel :count="post._count.tweets - 1" />
    </button>
  </Tooltip>
</template>

<script setup lang="ts">
import CountLabel from "@/components/CountLabel.vue";
import Tooltip from "@/components/Tooltip.vue";
import postStore from "@/stores/postStore";
import { IPost } from "@/stores/types/post.types";
import uiStore from "@/stores/uiStore";
import Icon from "@heroicons/vue/24/outline/ArrowPathRoundedSquareIcon"

const store = postStore()
const ui = uiStore()

const props = defineProps<{ post: IPost }>()

const repost = async () => {
  try {
    await store.repost(props.post.id, props.post.isRetweet)
  } catch (err) {
    ui.setToast("Retweet failure")
    return
  }
}
</script>