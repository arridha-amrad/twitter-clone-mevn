<template>
  <div class="relative group">
    <slot></slot>
    <div
      class="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in -bottom-1 translate-y-full left-1/2 -translate-x-1/2  border bg-slate-200 dark:bg-slate-900 dark:border-slate-600 py-1 px-2 rounded-lg">
      <p class="whitespace-nowrap sm:text-sm text-xs">{{ tip }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ tip: string }>()
</script>