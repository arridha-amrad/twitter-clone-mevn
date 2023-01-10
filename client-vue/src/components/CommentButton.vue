<template>
  <button @click="toggle" class="btn btn-outline-success">Comments</button>
  <div v-if="isShow" @click="toggle" class="my-modal">
    <div class="my-modal__overlay" />
    <div class="my-modal__container p-3 bg-body-secondary ">
      <div @click.stop="" class="d-flex justify-content-center">
        <CreatePostComment :post-id="postId" />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from './Modal.vue';
import CreatePostComment from '@/features/CreatePostComment.vue';

const isShow = ref(false)
const toggle = () => isShow.value = !isShow.value
const props = defineProps<{ postId: string }>()

</script>

<style scoped>
.my-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.my-modal__overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.my-modal__container {
  z-index: 100;
}
</style>