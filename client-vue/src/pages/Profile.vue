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
import Sidebar from "@/components/Sidebar.vue";
import SearchInput from "@/components/Input/SearchInput.vue";
import LayoutLeft from "@/components/Layout/LayoutLeft.vue";
import LayoutCenter from "@/components/Layout/LayoutCenter.vue";
import LayoutRight from "@/components/Layout/LayoutRight.vue";
</script>
