<template>
  <button @click.stop="openModal" type="button" class="flex items-center gap-1 sm:text-sm text-xs font-medium">
    <span v-show="post._count.children > 0">{{
      post._count.children
    }}</span>
    <CommentIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
  </button>

  <Modal :is-show="isShow" :close-modal="closeModal">
    <div class="border-0 space-y-5 w-full md:min-w-[500px] sm:min-w-[300px]">
      <div class="flex gap-3">
        <Avatar :url="avatar" />
        <div id="post-content" class="flex-fill">
          <div class="flex gap-2 items-center">
            <div class="font-bold">{{ post.author.username }}</div>
            <div>&bull;</div>
            <div class="text-sm">{{ date }}</div>
          </div>
          <p class="leading-tight text-sm dark:text-gray-200 text-black opacity-75">{{ post.body }}</p>
        </div>
      </div>
      <form @submit.prevent="submitComment" class="flex gap-4 flex-col">
        <textarea id="comment" rows="4" v-model="body" class="
          w-full border focus:border-transparent border-gray-300 dark:border-gray-500  rounded-lg bg-white px-3 text-sm text-gray-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 md:text-base
          " placeholder="comment..."></textarea>
        <button :disabled="isLoading" type="submit"
          class="self-end rounded-lg px-5 py-1.5 text-sm font-medium outline-none transition duration-200 ease-in focus:ring-4 md:text-base bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-400">
          <Spinner size="sm" v-if="isLoading">Loading...</Spinner>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Modal from "./Modal.vue";
import { IPostWithParents } from "@/stores/types/post.types";
import timeSetter from "@/utils/timeSetter";
import CommentIcon from "@heroicons/vue/24/outline/ChatBubbleOvalLeftIcon"
import Avatar from "./Avatar.vue";
import Spinner from "./Spinner.vue";
import postStore from "@/stores/postStore";

const isShow = ref(false);

const openModal = () => {
  isShow.value = true;
  document.body.style.overflowY = "hidden";
};
const closeModal = () => {
  isShow.value = false;
  document.body.style.overflowY = "auto";
};

const props = defineProps<{ post: IPostWithParents }>();
const avatar = computed(() => {
  const url = props.post.author.imageURL;
  if (url === "default") return "/default.png";
  return url;
});
const date = computed(() => timeSetter(props.post.createdAt.toString()));

const body = ref("")
const isLoading = ref(false)
const store = postStore()

const submitComment = async () => {
  const b = body.value
  if (!b) return
  try {
    isLoading.value = true
    await store.createComment({
      body: b,
      postId: props.post.id
    })
    body.value = ""
  } catch (err) {
    console.log("err : ", err);
  } finally {
    isLoading.value = false
    closeModal()
  }
}
</script>
