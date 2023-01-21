<template>
  <div
    v-if="type === 'error'"
    class="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    {{ message }}
  </div>

  <div
    v-else
    class="mb-4 rounded-lg bg-green-100 p-4 text-sm text-green-700 dark:bg-gray-800 dark:text-green-400"
    role="alert"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
export type TAlert = "success" | "error";
defineProps<{ type: TAlert; message: string }>();
</script>
