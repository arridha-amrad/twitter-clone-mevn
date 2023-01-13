<script setup lang="ts">
import SidebarOffCanvas from './components/SidebarOffCanvas.vue';
import Toast from './components/Toast.vue';
</script>

<template>
  <SidebarOffCanvas />
  <router-view></router-view>
  <Toast />
</template>

<style scoped>

</style>
