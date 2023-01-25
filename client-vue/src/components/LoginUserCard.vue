<template>
  <div class="bg-white dark:bg-slate-800 dark:border dark:border-slate-700 p-4 rounded-lg space-y-2">
    <h1 class="font-bold text-xl">{{ user?.username }}</h1>
    <p>{{ user?.id }}</p>
    <LogoutFeature />
    <ThemeButton />
  </div>
</template>

<script setup lang="ts">
import LogoutFeature from '@/features/LogoutFeature.vue';
import authStore from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import ThemeButton from './ThemeButton.vue';

const { user } = storeToRefs(authStore())

</script>