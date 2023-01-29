<template>
  <main>
    <div class="container mx-auto">
      <div class="flex">
        <LayoutLeft>
          <Sidebar />
        </LayoutLeft>
        <LayoutCenter>
          <div v-if="isLoading" class="flex items-center justify-center">
            <Spinner />
          </div>
          <div v-else>
            <Alert type="error" message="Post not found" v-if="postDetail === null" />
            <div v-else class="border rounded-lg dark:border-0">
              <SimplePostCard :post="postDetail!" />
              <div class="flex p-2 d-flex justify-around">
                <like-post :post="postDetail!" />
                <button @click="inputRef?.commentInput?.focus()" class="relative">
                  <span class="absolute right-7 top-1/2 -translate-y-1/2" v-show="postDetail._count.children > 0">{{
                    postDetail._count.children
                  }}</span>
                  <CommentIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div class="p-2">
                <CreateCommentFeature ref="inputRef" :is-detail-page="true" :post-id="postDetail!.id" />
              </div>
            </div>
            <Comments :comments="comments" />
          </div>
        </LayoutCenter>
        <LayoutRight>
          <SearchInput />
        </LayoutRight>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import CommentIcon from "@heroicons/vue/24/outline/ChatBubbleOvalLeftIcon"
import Alert from "@/components/Alert.vue";
import LayoutCenter from "@/components/Layout/LayoutCenter.vue";
import LayoutLeft from "@/components/Layout/LayoutLeft.vue";
import LayoutRight from "@/components/Layout/LayoutRight.vue";
import SearchInput from "@/components/Input/SearchInput.vue";
import Sidebar from "@/components/Sidebar.vue";
import SimplePostCard from "@/components/PostCard/SimplePostCard.vue";
import Spinner from "@/components/Spinner.vue";
import CreateCommentFeature from "@/features/CreateCommentFeature.vue";
import LikePost from "@/features/LikePostFeature.vue";
import postStore from "@/stores/postStore";
import { computed, onUnmounted, provide, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Comments from "./Comments.vue";

provide("isComment", false);

onUnmounted(() => {
  store.posts = [];
});

const store = postStore();
const router = useRouter();
const inputRef = ref<InstanceType<typeof CreateCommentFeature> | null>(null);
const isLoading = ref(true);
const postId = computed(() => router.currentRoute.value.params.id as string);
const postDetail = computed(() => store.posts[0]);
const comments = computed(() => store.comments);

const findPost = async () => {
  try {
    await store.getOnePost(postId.value);
    setTimeout(() => (isLoading.value = false), 300);
  } catch (err) {
    console.log("err : ", err);
    router.push("/");
  }
};

watchEffect(async () => {
  await findPost();
});
</script>
