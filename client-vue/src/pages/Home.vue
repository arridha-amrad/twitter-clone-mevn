<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-5 d-md-block d-none vh-100 position-sticky top-0 bottom-0 start-0 end-0">
        <Sidebar />
      </div>
      <div class="col-lg-5 col-md-7 col-sm-12 p-3">
        <CreatePostFeature />
        <LoadPostsFeature />
        <p v-show="isLoading">fetching more posts...</p>
      </div>
      <div class="col-lg-4 p-3">
        <SearchInput />
      </div>
    </div>
  </div>
  <div v-show="isShow" class="position-fixed bottom-0 end-0 translate-middle-x">
    <button @click="goUp" class="btn btn-primary mb-3">Go Up</button>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
import SearchInput from "@/components/SearchInput.vue"
import CreatePostFeature from "@/features/CreatePostFeature.vue"
import LoadPostsFeature from '@/features/LoadPostsFeature.vue';
import postStore from "@/stores/postStore";
import { useInfiniteScroll } from "@vueuse/core";
import { ref } from "vue";

const isShow = ref(false)

const goUp = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}

const isLoading = ref(false)
const store = postStore()
useInfiniteScroll(document, async () => {
  isLoading.value = true
  try {
    await store.getPosts()
    isShow.value = true
  } catch (err) {
  } finally {
    isLoading.value = false
  }
})

</script>
