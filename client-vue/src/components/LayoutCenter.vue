<template>
  <div class="col-lg-5 col-md-7 col-sm-12 p-3">
    <div class="d-flex d-lg-none gap-4">
      <button class="btn btn-outline-primary mb-3 btn-sm d-block d-md-none" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
        Menu
      </button>
      <SearchInput />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import SearchInput from './SearchInput.vue';
</script>