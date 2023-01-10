<template>
  <div class="card w-100 mb-3">
    <div class="card-body bg-body-tertiary d-flex gap-3 align-items-start">
      <img class="avatar rounded-circle border" src="/default.png" alt="avatar">
      <div id="post-content" class="flex-fill">
        <div class="d-flex align-items-center gap-2 text-black-50 fs-6">
          <div class="fw-bold ">username</div>
          <div class="">{{ date }}</div>
        </div>
        <p class="card-text">post body.</p>
        <div class="d-flex align-items-center justify-content-between w-100">
        </div>
        <div id="post-content-action" class="d-flex justify-content-between align-items-center">
          <button class="btn btn-primary btn-sm">Like</button>
          <button class="btn btn-primary btn-sm">Like</button>
          <button class="btn btn-primary btn-sm">Like</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import timeSetter from '@/utils/timeSetter';
import { computed, onMounted, ref } from 'vue';
const store = postStore()
const isLoadingPosts = ref(true)
const date = computed(() => timeSetter(new Date().toString()))
onMounted(async () => {
  try {
    await store.getPosts()
  } catch (err) {
    console.log("err : ", err);
  } finally {
    isLoadingPosts.value = false
  }
})

</script>

<style scoped>
.avatar {
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
}
</style>