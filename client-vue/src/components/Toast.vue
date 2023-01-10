<template>
  <div class="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x">
    <div id="liveToast" :class="['toast', 'border-0', toastType]" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="/logo.png" class="small-logo " alt="logo">
        <strong class="me-auto">Twitter</strong>
        <small class="text-muted">just now</small>
      </div>
      <div class="toast-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ type: "success" | "error" }>()
const toastType = computed(() => props.type === "success" ? "text-bg-primary" : "text-bg-danger")
</script>