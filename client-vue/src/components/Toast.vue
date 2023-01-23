<template>
  <div
    v-show="message !== ''"
    class="fixed bottom-0 left-1/2 -translate-x-1/2 z-[999]"
  >
    <div
      id="toast-danger"
      class="flex items-center w-full max-w-sm px-4 py-2 mb-4 text-gray-500 bg-blue-200 rounded-lg dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div>
        <img class="h-8 w-8" src="/logo.png" />
      </div>
      <p class="ml-3 text-sm font-normal text-blue-500 text-nowrap">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
</script>
