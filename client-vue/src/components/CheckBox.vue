<template>
  <div class="mb-4 flex items-center">
    <input
      id="default-checkbox"
      type="checkbox"
      :value="checked"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <label for="default-checkbox" class="ml-2">{{ labelText }}</label>
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
