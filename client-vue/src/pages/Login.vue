<template>
  <main>
    <div class="container">
      <div class="row vh-100 d-flex justify-content-center align-items-center">
        <div class="col-lg-3 rounded-4 py-4 px-3">
          <h1 class="mb-3 fw-bold">Login</h1>
          <LoginFeature />
          <div class="d-flex align-items-center justify-content-between mt-3">
            <router-link class="text-decoration-none" to="/register"
              >forgot password</router-link
            >
            <router-link class="text-decoration-none" to="/register"
              >Register</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import LoginFeature from "@/features/LoginFeature.vue";
</script>
