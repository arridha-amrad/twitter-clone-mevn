<template>
  <div class="bg-white p-4 rounded-lg space-y-2">
    <h1 class="font-bold text-xl">{{ user?.username }}</h1>
    <p>{{ user?.id }}</p>
    <LogoutFeature />
  </div>
</template>

<script setup lang="ts">
import LogoutFeature from '@/features/LogoutFeature.vue';
import authStore from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(authStore())

</script>