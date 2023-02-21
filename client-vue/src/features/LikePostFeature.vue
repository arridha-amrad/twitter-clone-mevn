<template>
  <Tooltip class="group" tip="like">
    <button class="flex relative items-center gap-1 sm:text-sm text-xs font-medium" @click.stop="like">
      <span>
        <HeartIconSolid v-if="isLiked" class="w-5 h-5 text-pink-500 dark:text-pink-600" />
        <HeartIconOutline v-else class="w-5 h-5 text-gray-500 group-hover:text-pink-500 dark:text-gray-400" />
      </span>
      <CountLabel :count="_count.likes" />
    </button>
  </Tooltip>
</template>

<script setup lang="ts">
import { Tweet } from "@/stores/types/post.types";
import postStore from "@/stores/postStore";
import { toRefs } from "vue";
import HeartIconOutline from "@heroicons/vue/24/outline/HeartIcon"
import HeartIconSolid from "@heroicons/vue/24/solid/HeartIcon"
import CountLabel from "@/components/CountLabel.vue";
import Tooltip from "@/components/Tooltip.vue";

const props = defineProps<{ tweet: Tweet }>();

const { isLiked, _count, id } = toRefs(props.tweet.post)

const store = postStore();

const like = async () => {
  try {
    await store.likePost(props.tweet.id, id.value);
  } catch (err) { }
};

</script>


