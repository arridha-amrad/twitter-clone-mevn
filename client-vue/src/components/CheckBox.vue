<template>
  <div class="form-check mt-1">
    <input class="form-check-input" type="checkbox" :value="checked" @change="
      $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
    " id="flexCheckDefault" />
    <label class="form-check-label text-muted" for="flexCheckDefault">
      {{ labelText }}
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  labelText: {
    type: String,
    require: true,
  },
  checked: {
    type: Boolean,
    require: true,
  },
});
defineEmits(["update:modelValue"]);
</script>
