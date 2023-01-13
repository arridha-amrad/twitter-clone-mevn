<template>
  <teleport to="body">
    <div @click="closeModal" v-if="isShow" class="dwa-modal">
      <div @click.stop="" class="dwa-modal__body">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ isShow: boolean, closeModal: VoidFunction }>()
const isModalOpen = ref(props.isShow)
watch(isModalOpen, (val) => {
  if (val) {
    document.body.style.overflow = "hidden"
  }
})
</script>


<style scoped>
.dwa-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}

.dwa-modal__body {
  min-width: 500px;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.7rem;
}
</style>
