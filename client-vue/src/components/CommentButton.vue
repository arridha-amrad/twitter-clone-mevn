<template>
  <button
    @click.stop="openModal"
    type="button"
    class="btn btn-outline-comment btn-sm"
  >
    {{ post._count.children }} Comments
  </button>
  <Modal :is-show="isShow" :close-modal="closeModal">
    <div class="bg-white border-0 w-full mb-6">
      <div class="flex gap-3">
        <img class="avatar" :src="avatar" alt="avatar" />
        <div id="post-content" class="flex-fill">
          <div class="flex gap-2 items-center">
            <div class="font-bold">{{ post.author.username }}</div>
            <div>&bull;</div>
            <div class="text-sm">{{ date }}</div>
          </div>
          <p class="leading-tight text-black opacity-75">{{ post.body }}</p>
        </div>
      </div>
    </div>
    <CreateCommentFeature @closeCurrModal="closeModal" :postId="post.id" />
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Modal from "./Modal.vue";
import CreateCommentFeature from "@/features/CreateCommentFeature.vue";
import { IPostWithParents } from "@/stores/types/post.types";
import timeSetter from "@/utils/timeSetter";

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
</script>
