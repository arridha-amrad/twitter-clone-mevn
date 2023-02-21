<template>
  <div ref="postCardCarousel" v-show="urls.length > 0" @click.stop=""
    class="my-4 relative group h-[400px] border dark:border-slate-700">
    <img ref="imgRef" class="object-contain object-center w-full h-full" src="" :data-source="srcs[0]" alt="image" />
    <button v-show="imgIndex > 0" @click="prev"
      class="absolute top-1/2 -translate-y-1/2 left-2 hover:border w-8 h-8 rounded-full group-hover:flex dark:hover:border-gray-600 items-center justify-center hidden bg-slate-300 dark:bg-slate-600">
      <IconLeft class="w-5 h-5" />
    </button>
    <button v-show="imgIndex < srcs.length - 1" @click="next"
      class="absolute top-1/2 -translate-y-1/2 right-2 hover:border dark:hover:border-gray-600 w-8 h-8 rounded-full group-hover:flex items-center justify-center hidden bg-slate-300 dark:bg-slate-600">
      <IconRight class="w-5 h-5" />
    </button>
    <ul v-show="urls.length > 1"
      class="absolute bottom-1 flex items-center gap-1 left-1/2 -translate-x-1/2 px-2 py-[1px] dark:bg-black bg-white bg-opacity-50 rounded-lg">
      <li v-for="(_, i) in srcs" :class="imgIndex === i ? 'text-gray-300' : 'text-gray-600'">&bull;
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import IconLeft from "@heroicons/vue/24/outline/ArrowLeftIcon"
import IconRight from "@heroicons/vue/24/outline/ArrowRightIcon"
import { onMounted, ref, watch } from "vue";
const props = defineProps<{ urls: string[] }>()
const srcs = ref(props.urls)
const imgIndex = ref(0)
const imgRef = ref<HTMLImageElement>()

const postCardCarousel = ref<HTMLDivElement>()
defineExpose({ postCardCarousel })

watch(
  imgIndex,
  (val) => {
    imgRef.value?.setAttribute("src", srcs.value[val])
  })

const next = () => {
  if (imgIndex.value === srcs.value.length - 1) return
  imgIndex.value++
}

const prev = () => {
  if (imgIndex.value === 0) return
  imgIndex.value--
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        const imageElement = entries[i].target.querySelector("img")
        const url = imageElement?.getAttribute("data-source")
        imageElement?.setAttribute("src", url!)
      }
    }
  })
  if (!postCardCarousel.value) return
  observer.observe(postCardCarousel.value)
})

</script>