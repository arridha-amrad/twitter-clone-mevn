<template>
  <main class="container mx-auto">
    <div class="flex justify-content-center align-items-center h-screen">
      <div class="space-y-5 border rounded-lg py-16 px-12 max-w-[500px] shadow w-full">
        <h1 class="font-bold text-3xl">Twitter</h1>
        <LoginFeature />
        <div class="d-flex align-items-center justify-content-between mt-3">
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
