<template>
  <div v-show="urls.length > 0" @click.stop="" class="my-4 relative group h-[400px] border dark:border-slate-700">
    <img class="object-contain object-center w-full h-full" :src="srcs[index]" alt="image" />
    <button @click="prev"
      class="absolute top-1/2 -translate-y-1/2 left-2 hover:border w-8 h-8 rounded-full group-hover:flex dark:hover:border-gray-600 items-center justify-center hidden bg-slate-300 dark:bg-slate-600">
      <IconLeft class="w-5 h-5" />
    </button>
    <button @click="next" class="absolute top-1/2 -translate-y-1/2 right-2
    hover:border dark:hover:border-gray-600 w-8 h-8 rounded-full group-hover:flex items-center justify-center
    hidden bg-slate-300 dark:bg-slate-600">
      <IconRight class="w-5 h-5" />
    </button>
    <ul class="absolute bottom-0 flex items-center gap-2 left-1/2 -translate-x-1/2">
      <li v-for="(_, i) in srcs"
        :class="index === i ? 'dark:text-gray-300 text-gray-500' : 'dark:text-gray-600 text-gray-300'">&bull;
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import IconLeft from "@heroicons/vue/24/outline/ArrowLeftIcon"
import IconRight from "@heroicons/vue/24/outline/ArrowRightIcon"
import { ref } from "vue";
const props = defineProps<{ urls: string[] }>()
const srcs = ref(props.urls)
const index = ref(0)

const next = () => {
  if (index.value === srcs.value.length - 1) return
  index.value++
}

const prev = () => {
  if (index.value === 0) return
  index.value--
}

</script>