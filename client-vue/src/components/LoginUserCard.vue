<template>
  <article class="bg-white dark:bg-slate-800 dark:border dark:border-slate-700 p-4 rounded-lg space-y-2">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-xl">{{ user?.username }}</h1>
      <ThemeButton />
    </div>
    <p>{{ user?.id }}</p>

    <LogoutFeature />

  </article>
</template>

<script setup lang="ts">
import LogoutFeature from '@/features/LogoutFeature.vue';
import authStore from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import ThemeButton from './ThemeButton.vue';

const { user } = storeToRefs(authStore())

</script>