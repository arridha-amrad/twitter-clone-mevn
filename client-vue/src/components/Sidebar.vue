<template>
  <section class="flex flex-col gap-4 pr-10">
    <div>
      <img class="h-16 w-16" src="/logo.png" />
    </div>
    <div v-for="link in links">
      <button
        @click="navigate(link.path)"
        :class="['btn', 'w-full', checkActive(link.path)]"
      >
        {{ link.name }}
      </button>
    </div>
    <LoginUserCard />
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import LoginUserCard from "./LoginUserCard.vue";

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
    return "btn-primary";
  } else {
    return "btn-outline-primary";
  }
};
</script>
