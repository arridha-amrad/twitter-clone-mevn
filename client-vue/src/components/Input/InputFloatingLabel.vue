<template>
  <div className="relative">
    <input autocomplete="off" ref="input" :type="type" :id="id" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="peer px-[16px] pb-2.5 pt-6 border border-gray-300 dark:border-gray-700 bg-transparent focus:border-transparent focus:ring-4 focus:ring-blue-300 focus:ring-offset-0 outline-none w-full rounded-lg text-sm text-gray-900 dark:text-gray-200 md:text-base dark:focus:ring-blue-500"
      placeholder=" " />
    <label :for="id" @click="input?.focus()"
      class="absolute top-2 left-2 origin-[0] -translate-y-1 scale-75 cursor-text px-2 transition-all duration-100 ease-in peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-1 peer-focus:scale-75 peer-focus:px-2 text-sm text-gray-500 subpixel-antialiased dark:text-gray-300  md:text-base">
      {{ labelText }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  type: {
    default: "text",
  },
  labelText: {
    required: true,
    type: String,
  },
  id: String,
  modelValue: {
    type: String,
    required: true,
  },
});
defineEmits(["update:modelValue"]);
const input = ref<HTMLInputElement>();
defineExpose({ input });
</script>
