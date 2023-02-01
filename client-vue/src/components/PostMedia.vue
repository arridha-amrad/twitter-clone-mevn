<template>

  <ul v-show="urls.length === 1" class="my-4 box-border grid grid-cols-1 grid-rows-1">
    <li v-for="(url, index) in urls" :key="index">
      <img class="w-auto rounded-lg h-full object-cover object-center" :src="url" alt="medias" />
    </li>
  </ul>

  <ul v-show="urls.length === 2" class="my-4 box-border grid grid-cols-2 grid-rows-2 gap-2">
    <li class="col-span-1 row-span-2" v-for="(url, index) in urls" :key="index">
      <img class="w-auto rounded-lg h-full object-cover object-center" :src="url" alt="medias" />
    </li>
  </ul>

  <ul v-show="urls.length === 3" class="my-4 box-border grid grid-cols-2 grid-rows-2 gap-2">
    <li :class="index === 0 ? 'col-span-1 row-span-2' : 'col-span-1 row-span-1'" v-for="(url, index) in urls"
      :key="index">
      <img class="w-auto rounded-lg h-full object-cover object-center" :src="url" alt="medias" />
    </li>
  </ul>

  <ul v-show="urls.length === 4" class="my-4 box-border grid grid-cols-2 grid-rows-2 gap-2">
    <li class="col-span-1 row-span-1" v-for="(url, index) in urls" :key="index">
      <img class="w-auto rounded-lg h-full object-cover object-center" :src="url" alt="medias" />
    </li>
  </ul>

</template>

<script setup lang="ts">

defineProps<{ urls: string[] }>()

</script>