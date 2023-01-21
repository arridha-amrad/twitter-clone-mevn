<template>
  <teleport to="body">
    <div @click="closeModal" v-show="isShow" class="dwa-modal">
      <div @click.stop="" :class="['dwa-modal__body', width]">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{ isShow: boolean, closeModal: VoidFunction, isSmallSize?: boolean }>()
const windowWidth = ref(document.body.clientWidth)

const width = computed(() => !!props.isSmallSize ? "w-sm" : windowWidth.value < 500 ? "w-100 mx-3" : "w-md")

onMounted(() => {
  window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
})

const handleResize = () => {
  windowWidth.value = document.body.clientWidth
}
</script>


<style scoped>
.dwa-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}

.w-md {
  width: 500px;
}

.w-sm {
  width: 300px;
  margin: 0 1rem;
}

.dwa-modal__body {
  max-height: 80vh;
  overflow: auto;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.7rem;
}
</style>
