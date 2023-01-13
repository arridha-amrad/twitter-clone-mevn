<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ user?.username }}</h5>
      <p class="card-text">{{ user?.id }}</p>
      <LogoutFeature />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoutFeature from '@/features/LogoutFeature.vue';
import authStore from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(authStore())

</script>