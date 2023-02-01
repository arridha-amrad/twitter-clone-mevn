<template>
  <ul @click="isOpen = true" class="-space-x-3 flex cursor-pointer">
    <li v-for="(file, index) in filesToPreview" :key="index">
      <img class="w-8 h-8 rounded-full border dark:border-gray-600 object-cover object-center" :src="file" alt="avatar">
    </li>
  </ul>
  <Modal :is-show="isOpen" :close-modal="closeModal">
    <div class="w-auto max-w-[600px] h-full max-h-[600px]">
      <PostMedia :urls="filesToPreview" />
    </div>
  </Modal>
</template>

<script setup lang="ts">import { ref } from 'vue';
import Modal from './Modal.vue';
import PostMedia from './PostMedia.vue';

defineProps<{ filesToPreview: string[] }>()
const isOpen = ref(false)
const closeModal = () => isOpen.value = false
</script>