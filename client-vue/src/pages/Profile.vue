<template>
  <main>
    <div class="container mx-auto">
      <div class="flex">
        <LayoutLeft>
          <Sidebar />
        </LayoutLeft>
        <LayoutCenter>
          <h1>This is profile page</h1>
          <button data-tooltip-target="tooltip-right" data-tooltip-placement="right" type="button"
            class="mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tooltip
            right</button>
          <div id="tooltip-right" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Tooltip on right
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>

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
