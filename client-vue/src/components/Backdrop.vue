<template>
  <Teleport to="#backdrop">
    <div v-show="uS.isLoading" class="flex items-center justify-center fixed inset-0">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <img class="w-20 h-20 z-50" src="/spinner.svg" alt="spinner" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import uiStore from '@/stores/uiStore';
const uS = uiStore()
</script>