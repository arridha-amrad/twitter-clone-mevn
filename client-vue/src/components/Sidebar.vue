<template>
  <section class="flex flex-col gap-4 w-full max-w-[300px]">
    <Logo />
    <div v-for="link in links">
      <button @click="navigate(link.path)"
        :class="'rounded-lg w-full px-5 py-2.5 text-sm font-medium outline-none transition duration-200 ease-in focus:ring-4 md:text-base ' + checkActive(link.path)">
        {{ link.name }}
      </button>
    </div>
    <LoginUserCard />
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import LoginUserCard from "./LoginUserCard.vue";
import Logo from "./Logo.vue";
const router = useRouter();
const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Profile",
    path: "/profile",
  },
];
const navigate = (path: string) => router.push(path);
const checkActive = (path: string) => {
  if (router.currentRoute.value.path === path) {
    return "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white";
  } else {
    return "border border-gray-300 dark:border-gray-700";
  }
};
</script>
