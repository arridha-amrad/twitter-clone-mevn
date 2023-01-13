<template>
  <div class="container-lg">
    <div class="row">
      <LayoutLeft>
        <Sidebar />
      </LayoutLeft>
      <LayoutCenter>
        <CreatePostFeature />
        <LoadPostsFeature />
        <p v-show="isLoading">fetching more posts...</p>
      </LayoutCenter>
      <LayoutRight>
        <SearchInput />
      </LayoutRight>
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
import LayoutLeft from "@/components/LayoutLeft.vue";
import LayoutCenter from "@/components/LayoutCenter.vue";
import LayoutRight from "@/components/LayoutRight.vue";

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
