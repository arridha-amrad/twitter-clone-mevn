<template>
  <teleport to="#modal">
    <Transition name="modal">
      <div @click="closeModal" v-show="isShow" class="dwa-modal backdrop-blur">
        <div @click.stop="" :class="['dwa-modal__body', width]">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";

const props = defineProps<{
  isShow: boolean;
  closeModal: VoidFunction;
  isSmallSize?: boolean;
}>();

const windowWidth = ref(document.body.clientWidth);

watchEffect((onCleanup) => {
  if (props.isShow) {
    document.body.style.overflow = "hidden";
  }
  onCleanup(() => {
    document.body.style.overflow = "auto";
  });
});

const width = computed(() =>
  !!props.isSmallSize ? "w-sm" : windowWidth.value < 500 ? "w-100 mx-3" : "w-md"
);

onMounted(() => {
  document.addEventListener("keydown", handleEscapePress);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapePress);
  window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
  windowWidth.value = document.body.clientWidth;
};

const handleEscapePress = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    props.closeModal();
  }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  opacity: 1;
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
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
