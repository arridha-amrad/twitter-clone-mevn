<template>
  <main>
    <div class="container ">
      <div class="row">
        <div class="col-lg-3 vh-100 position-sticky top-0 bottom-0 start-0 end-0">
          <Sidebar />
        </div>
        <div class="col-lg-5 p-3">
          <h1>Post Detail</h1>
        </div>
        <div class="col-lg-4 bg-danger bg-opacity-10">
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
</script>