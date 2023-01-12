<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ user?.username }}</h5>
      <p class="card-text">{{ user?.id }}</p>
      <button @click="logout" class="btn btn-primary btn-sm">logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import authStore from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const store = authStore()
const { user } = storeToRefs(authStore())
const router = useRouter()

const logout = async () => {
  try {
    await store.logout()
    router.replace("/login")
  } catch (error) {
  }
}

</script>