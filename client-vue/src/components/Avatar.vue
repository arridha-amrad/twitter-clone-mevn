<template>
  <img class="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-gray-100 dark:border-slate-600"
    :src="url" alt="avatar" />
</template>

<script setup lang="ts">
defineProps<{ url: string }>()
</script>