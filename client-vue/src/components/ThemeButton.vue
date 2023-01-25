<script setup lang="ts">
import Button from './Button.vue';
const changeTheme = () => {
  const theme = localStorage.getItem("theme")
  if (theme && theme === "dark") {
    localStorage.setItem("theme", "light")
    document.documentElement.classList.remove("dark")
  } else {
    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add("dark")
  }
}
</script>

<template>
  <Button @click="changeTheme" class="dark:bg-blue-600 bg-blue-500 text-white" label="Change Theme"></Button>
</template>