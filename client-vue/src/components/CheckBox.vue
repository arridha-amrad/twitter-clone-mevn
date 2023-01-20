<template>
  <div class="flex items-center mb-4">
    <input id="default-checkbox" type="checkbox" :value="checked"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="w-5 h-5 cursor-pointer text-blue-500 bg-slate-100 border-gray-300 border-2 rounded focus:border-transparent focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-offset-0 dark:bg-gray-700 dark:border-gray-600">
    <label for="default-checkbox" class="ml-2 text-sm md:text-base text-gray-900 dark:text-gray-300">{{
      labelText
    }}</label>
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
