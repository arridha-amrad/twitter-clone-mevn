<template>
  <h1>{{ message }}</h1>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
</script>