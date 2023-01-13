<template>
  <div class="form-floating">
    <input ref="input" placeholder="name@example.com" :type="type" class="form-control" :id="id" :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      " />
    <label class="text-muted" :for="id">{{ labelText }}</label>
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
