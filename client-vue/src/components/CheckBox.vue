<template>
  <div class="mb-4 flex items-center">
    <input id="default-checkbox" type="checkbox" :value="checked" @change="
    $emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="h-5 w-5 cursor-pointer rounded-md text-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-500 focus:ring-offset-2" />
    <label for="default-checkbox"
      class="ml-2 text-sm text-gray-500 subpixel-antialiased dark:text-gray-300  md:text-base">{{ labelText }}</label>
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
