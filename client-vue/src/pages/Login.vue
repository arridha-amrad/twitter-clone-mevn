<template>
  <main class="container mx-auto">
    <div class="flex h-screen items-center justify-center p-6 md:p-12">
      <div
        class="w-full max-w-[500px] space-y-5 md:bg-white md:py-16 md:px-12 rounded-lg"
      >
        <h1 class="text-3xl font-bold">Twitter</h1>
        <LoginFeature />
        <div class="flex justify-between">
          <router-link class="link" to="/register">forgot password</router-link>
          <router-link class="link" to="/register">Register</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import LoginFeature from "@/features/LoginFeature.vue";
</script>
