<template>
  <main class="container mx-auto">
    <div class="flex h-screen items-center justify-center p-6 md:p-12">
      <div class="w-full max-w-[500px] space-y-5 rounded-lg md:bg-white md:dark:bg-black md:px-12 md:py-16">
        <h1 class="text-3xl font-bold">Register</h1>
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
