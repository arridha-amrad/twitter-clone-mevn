<template>
  <Tooltip class="group" tip="like">
    <button class="flex relative items-center gap-1 sm:text-sm text-xs font-medium" @click.stop="like">
      <span>
        <HeartIconSolid v-if="likeObj.isLiked" class="w-5 h-5 text-pink-500 dark:text-pink-600" />
        <HeartIconOutline v-else class="w-5 h-5 text-gray-500 group-hover:text-pink-500 dark:text-gray-400" />
      </span>
      <CountLabel :count="likeObj.totalLikes" />
    </button>
  </Tooltip>
</template>

<script setup lang="ts">
import { IPostWithParents } from "@/stores/types/post.types";
import postStore from "@/stores/postStore";
import { reactive } from "vue";
import HeartIconOutline from "@heroicons/vue/24/outline/HeartIcon"
import HeartIconSolid from "@heroicons/vue/24/solid/HeartIcon"
import CountLabel from "@/components/CountLabel.vue";
import Tooltip from "@/components/Tooltip.vue";
const props = defineProps<{ post: IPostWithParents }>();

const likeObj = reactive({
  isLiked: props.post.isLiked,
  totalLikes: props.post._count.likes,
});
const store = postStore();

const like = async () => {
  try {
    const isLiked = await store.likePost(props.post.id);
    likeObj.isLiked = isLiked;
    isLiked ? likeObj.totalLikes++ : likeObj.totalLikes--;
  } catch (err) { }
};

</script>


