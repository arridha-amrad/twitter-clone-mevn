<script setup lang="ts">
import { onMounted } from 'vue';
import authStore from './stores/authStore';

const store = authStore()

const applyTheme = () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem("theme", "light")
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
