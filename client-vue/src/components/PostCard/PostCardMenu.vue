<template>
  <div class="relative">
    <button ref="btnRef" class="group" @click.stop="isShow = !isShow">
      <MenuIcon class="w-6 dark:text-gray-400 text-gray-500 group-hover:text-blue-500" />
    </button>
    <ul ref="menuRef" v-show="isShow"
      class="absolute overflow-hidden z-50 border dark:border-transparent rounded-lg right-0 bg-white dark:bg-slate-700 top-6 sm:text-sm text-xs">
      <li @click.stop="openModal" class="p-2 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-500 cursor-pointer">
        <p class="w-full whitespace-nowrap sm:text-sm text-xs">delete</p>
      </li>
    </ul>
    <Modal :is-show="isShowModal" :close-modal="closeModal" :is-small-size="true">
      <div class="flex flex-col items-center gap-2 max-w-[250px]">
        <h1 class="text-3xl font-bold">Delete Post</h1>
        <p class="dark:text-gray-400 text-sm text-center">Are you sure to delete this post? <br>
          This action cannot be undo
        </p>
        <div class="flex gap-5 mt-6">
          <button @click="deletePost" class="sm:text-base text-sm font-bold text-red-500">
            Yes
          </button>
          <button @click="closeModal" class="sm:text-base text-sm text-gray-500 dark:text-gray-300">Cancel</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import postStore from "@/stores/postStore";
import Modal from "../Modal.vue";
import MenuIcon from "@heroicons/vue/24/outline/EllipsisHorizontalIcon"


const props = defineProps<{
  postId: string;
  isParentSimplePostCard?: boolean;
}>();
const store = postStore();

const isShowModal = ref(false);
const openModal = () => (isShowModal.value = true);
const closeModal = () => (isShowModal.value = false);

const deletePost = async () => {
  try {
    closeModal();
    await store.deletePost(props.postId);
  } catch (err) {
  }
};

const menuRef = ref<HTMLUListElement>();
const isShow = ref(false);
const btnRef = ref<HTMLButtonElement>()

onClickOutside(menuRef, () => (isShow.value = false));
</script>
