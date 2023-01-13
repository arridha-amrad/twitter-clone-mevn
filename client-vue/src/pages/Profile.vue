<template>
  <main>
    <div class="container ">
      <div class="row">
        <div class="col-lg-3 vh-100 position-sticky top-0 bottom-0 start-0 end-0">
          <Sidebar />
        </div>
        <div class="col-lg-5 p-3">
          <h1>This is profile page</h1>
        </div>
        <div class="col-lg-4 bg-danger bg-opacity-10 p-3">
          <SearchInput />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
import SearchInput from "@/components/SearchInput.vue"
import LogoutFeature from "@/features/LogoutFeature.vue";
</script>