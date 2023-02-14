<template>
  <Tooltip class="group" tip="Repost">
    <button class="flex relative items-center gap-1 sm:text-sm text-xs font-medium" @click.stop="repost">
      <span>
        <Icon v-if="repostObj.isRepost" class="w-5 h-5 text-green-500 dark:text-green-600" />
        <Icon v-else class="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-green-500" />
      </span>
      <CountLabel :count="repostObj.total" />
    </button>
  </Tooltip>
</template>

<script setup lang="ts">
import CountLabel from "@/components/CountLabel.vue";
import Tooltip from "@/components/Tooltip.vue";
import postStore from "@/stores/postStore";
import { IPost } from "@/stores/types/post.types";
import Icon from "@heroicons/vue/24/outline/ArrowPathRoundedSquareIcon"
import { reactive } from "vue";
const props = defineProps<{ post: IPost }>()

const repostObj = reactive({
  isRepost: props.post.isRetweet,
  // 1 tweet means that tweet created by original author
  total: props.post._count.tweets - 1
})

const store = postStore()
const repost = async () => {
  try {
    await store.repost(props.post.id)
    if (repostObj.isRepost) {
      repostObj.total--
      repostObj.isRepost = false
    } else {
      repostObj.total++
      repostObj.isRepost = true
    }
  } catch (err) {
    console.log("err : ", err);
  }
}
</script>