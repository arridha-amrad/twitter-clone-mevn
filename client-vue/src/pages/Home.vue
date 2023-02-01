<template>
  <div class="container mx-auto">
    <div class="flex">
      <LayoutLeft>
        <Sidebar />
      </LayoutLeft>
      <LayoutCenter>
        <CreatePostFeature ref="postCreatorRef" />
        <LoadPostsFeature />
        <div v-show="isLoading" class="flex justify-center items-center h-14">
          <Spinner />
        </div>
      </LayoutCenter>
      <LayoutRight>
        <SearchInput />
      </LayoutRight>
    </div>
  </div>
  <div v-show="isShow" class="fixed bottom-5 right-5">
    <button @click="goUp" class="btn btn-primary">
      <Icon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import SearchInput from "@/components/Input/SearchInput.vue";
import CreatePostFeature from "@/features/CreatePostFeature.vue";
import LoadPostsFeature from "@/features/LoadPostsFeature.vue";
import postStore from "@/stores/postStore";
import { useInfiniteScroll } from "@vueuse/core";
import { onMounted, ref } from "vue";
import LayoutLeft from "@/components/Layout/LayoutLeft.vue";
import LayoutCenter from "@/components/Layout/LayoutCenter.vue";
import LayoutRight from "@/components/Layout/LayoutRight.vue";
import Spinner from "@/components/Spinner.vue";
import Icon from "@heroicons/vue/24/outline/ArrowUpIcon"

const isShow = ref(false);
const postCreatorRef = ref<InstanceType<typeof CreatePostFeature> | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }
  }, {
    rootMargin: "0px 0px 100px 0px"
  });
  if (!postCreatorRef.value) return;
  if (postCreatorRef.value.postFormRef)
    observer.observe(postCreatorRef.value.postFormRef);
});

const goUp = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const isLoading = ref(false);
const store = postStore();
useInfiniteScroll(document, async () => {
  isLoading.value = true;
  try {
    await store.getPosts();
    isShow.value = true;
  } catch (err) {
  } finally {
    isLoading.value = false;
  }
});
</script>
