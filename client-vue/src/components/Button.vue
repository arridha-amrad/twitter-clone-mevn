<template>
  <button
    class="rounded-lg px-5 py-2.5 text-sm font-medium outline-none transition duration-200 ease-in focus:ring-4 md:text-base">{{
  label
    }}</button>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()

</script>