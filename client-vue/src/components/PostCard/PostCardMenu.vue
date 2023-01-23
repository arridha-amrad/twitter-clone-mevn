<template>
  <div class="relative">
    <button
      class="hover:bg-blue-100 w-8 h-8 rounded-full"
      @click.stop="isShow = !isShow"
    >
      &bull;&bull;&bull;
    </button>
    <ul ref="menuRef" v-show="isShow" class="bg-white absolute right-0 top-6">
      <li
        @click.stop="openModal"
        class="p-2 border rounded shadow-sm hover:bg-slate-100"
      >
        delete
      </li>
    </ul>
    <Modal
      :is-show="isShowModal"
      :close-modal="closeModal"
      :is-small-size="true"
    >
      <div class="flex flex-col gap-3 items-center">
        <h1 class="text-3xl font-bold mb-4">Delete Post</h1>
        <div>
          <button @click="deletePost" class="btn btn-outline-danger">
            Yes
          </button>
          <button @click="closeModal" class="btn btn-secondary">Cancel</button>
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
import { useRouter } from "vue-router";

const props = defineProps<{
  postId: string;
  isParentSimplePostCard?: boolean;
}>();
const store = postStore();

const isShowModal = ref(false);
const openModal = () => (isShowModal.value = true);
const closeModal = () => (isShowModal.value = false);
const router = useRouter();

const pageName = router.currentRoute.value.name;

const deletePost = async () => {
  try {
    await store.deletePost(props.postId);
    closeModal();
    if (pageName === "PostDetail" && props.isParentSimplePostCard) {
      router.back();
    }
  } catch (err) {}
};

const menuRef = ref<HTMLUListElement>();
const isShow = ref(false);

onClickOutside(menuRef, () => (isShow.value = false));
</script>
