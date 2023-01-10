<template>
  <main>
    <div class="container">
      <div class="row vh-100 d-flex justify-content-center align-items-center">
        <div class="col-lg-3 rounded-4 py-4 px-3">
          <h1 class="mb-3 fw-bold">Register</h1>
          <p v-if="isSuccess" class="text-success text-center">
            Congratulations
          </p>
          <RegisterFeature />
          <div class="text-center mt-3">
            Have an account ?
            <router-link class="text-decoration-none" to="/login">login</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import RegisterFeature from "@/features/RegisterFeature.vue";
import { ref } from "vue";

const isSuccess = ref(false);
</script>

<style scoped>

</style>
