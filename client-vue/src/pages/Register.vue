<template>
  <main class="container mx-auto">
    <div class="flex justify-content-center align-items-center h-screen">
      <div class="space-y-5 border rounded-lg py-16 px-12 max-w-[500px] shadow w-full">
        <h1 class="font-bold text-3xl">Register</h1>
        <RegisterFeature />
        <div class="text-center">
          Have an account ?
          <router-link class="link" to="/login">login</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import RegisterFeature from "@/features/RegisterFeature.vue";
</script>
