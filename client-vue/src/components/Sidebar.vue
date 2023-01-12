<style scoped>
.logo {
  height: 4rem;
  width: 4rem;
}
</style>

<template>
  <section class="position-relative d-flex flex-column gap-2 ms-3 w-75">
    <div>
      <img class="logo" src="/logo.png" />
    </div>
    <div v-for="link in links">
      <button @click="navigate(link.path)" :class="['btn', 'w-100', 'btn-lg', checkActive(link.path)]">{{
        link.name
      }}</button>
    </div>
    <LoginUserCard />
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import LoginUserCard from './LoginUserCard.vue';

const router = useRouter()
const links = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Profile",
    path: "/profile"
  }
]
const navigate = (path: string) => router.push(path)
const checkActive = (path: string) => {
  if (router.currentRoute.value.path === path) {
    return "btn-primary"
  } else {
    return "btn-outline-primary"
  }
}
</script>