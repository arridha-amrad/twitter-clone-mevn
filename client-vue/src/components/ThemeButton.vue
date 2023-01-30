<template>
  <Tooltip tip="switch theme">
    <button class="hover:bg-slate-100 dark:hover:bg-slate-700 w-8 h-8 flex items-center justify-center rounded-lg"
      @click="changeTheme">
      <MoonIcon class="w-5 h-5 dark:hidden block text-gray-600" />
      <SunIcon class="w-5 h-5 dark:block hidden" />
    </button>
  </Tooltip>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import SunIcon from "@heroicons/vue/24/solid/SunIcon"
import MoonIcon from "@heroicons/vue/24/solid/MoonIcon"
import Tooltip from './Tooltip.vue';
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