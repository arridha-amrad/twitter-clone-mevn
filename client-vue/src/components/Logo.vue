<template>
  <img ref="logoRef" class="h-16 w-16" :src="uS.isDarkMode ? '/logo-dark.svg' : '/logo-light.svg'" />
</template>

<script setup lang="ts">
import uiStore from '@/stores/uiStore';
const uS = uiStore()

</script>