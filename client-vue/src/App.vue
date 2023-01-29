<script setup lang="ts">
import { onMounted } from 'vue';
import authStore from './stores/authStore';

const store = authStore()

const applyTheme = () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add("dark")
  } else {
    localStorage.setItem("theme", "light")
    document.documentElement.classList.remove("dark")
  }
}

onMounted(() => {
  applyTheme()
})

</script>

<template>
  <div v-if="store.isLoading" class="flex items-center justify-center h-screen">
    <img class="w-20 h-20" src="./assets/spinner.svg" alt="spinner" />
  </div>
  <RouterView v-else></RouterView>
</template>

<style scoped>

</style>
