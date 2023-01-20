<template>
  <div className="relative">
    <input autocomplete="off" ref="input" :type="type" class="form-control" :id="id" :value="modelValue" @input="
    $emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      className="peer block w-full transform appearance-none rounded-lg border-2 border-gray-300 bg-transparent px-[12px] pb-2.5 pt-6 text-sm text-gray-900 focus:border-transparent outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-600 dark:text-white md:text-base"
      placeholder=" " />
    <label for="floating_outlined" @click="input?.focus()"
      className="absolute top-2 left-2 origin-[0] -translate-y-1 scale-[85%] transform cursor-text px-2 text-sm text-gray-500 transition-all  duration-100 ease-in peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-1 peer-focus:scale-[85%] peer-focus:px-2 dark:text-gray-400 selection:dark:bg-gray-900 md:text-base">
      {{ labelText }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
const input = ref<HTMLInputElement>()
defineExpose({ input })
</script>
