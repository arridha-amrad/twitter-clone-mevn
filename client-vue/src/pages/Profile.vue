<template>
  <main>
    <div class="container mx-auto">
      <div class="flex">
        <LayoutLeft>
          <Sidebar />
        </LayoutLeft>
        <LayoutCenter>
          <h1>This is profile page</h1>
        </LayoutCenter>
        <LayoutRight>
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