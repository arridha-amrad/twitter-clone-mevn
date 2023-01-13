<template>
  <main>
    <div class="container-lg">
      <div class="row">
        <LayoutLeft>
          <Sidebar />
        </LayoutLeft>
        <LayoutCenter class="col-lg-5 p-3">
          <h1>This is profile page</h1>
        </LayoutCenter>
        <LayoutRight class="col-lg-4 bg-danger bg-opacity-10 p-3">
          <SearchInput />
        </LayoutRight>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
import SearchInput from "@/components/SearchInput.vue"
import LayoutLeft from "@/components/LayoutLeft.vue";
import LayoutCenter from "@/components/LayoutCenter.vue";
import LayoutRight from "@/components/LayoutRight.vue";
</script>