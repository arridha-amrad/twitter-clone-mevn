<template>
  <Transition name="label">
    <span class="absolute top-1/2 left-7 -translate-y-1/2" v-show="count > 0">
      {{ count }}
    </span>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ count: number }>()
</script>


<style scoped>
.label-enter-active,
.label-leave-active {
  opacity: 1;
  transition: all .2s ease;
}

.label-enter-from,
.label-leave-to {
  opacity: 0;
  transform: translateY(2px)
}
</style>
