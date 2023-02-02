<script setup lang="ts">
import { onMounted } from 'vue';
import authStore from './stores/authStore';
import Toast from './components/Toast.vue';
import uiStore from "./stores/uiStore"
import Backdrop from './components/Backdrop.vue';

const store = authStore()
const uS = uiStore()

const applyTheme = () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add("dark")
    uS.isDarkMode = true
  } else {
    localStorage.setItem("theme", "light")
    document.documentElement.classList.remove("dark")
    uS.isDarkMode = false
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
  <Toast :message="uS.toastMessage" />
  <Backdrop />

</template>

<style scoped>

</style>
