<template>
  <main>
    <div class="container-lg ">
      <div class="row">
        <LayoutLeft>
          <Sidebar />
        </LayoutLeft>
        <LayoutCenter>
          <Loading v-if="isLoading" />
          <div v-else>
            <div v-if="postDetail === null">Post not found</div>
            <div v-else>
              <SimplePostCard :post="postDetail!" />
              <div class="d-flex p-2 border border-top-0 d-flex justify-content-around">
                <like-post :post="postDetail!" />
                <button @click="inputRef?.commentInput?.focus()" class="btn btn-outline-success btn-sm">{{
                  postDetail._count.children
                }} Comments</button>
              </div>
              <div class="border border-top-0 p-2">
                <CreateCommentFeature ref="inputRef" :is-detail-page="true" :post-id="postDetail!.id" />
              </div>
              <Comments :comments="comments" />
            </div>
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
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import SearchInput from '@/components/SearchInput.vue';
import postStore from '@/stores/postStore';
import { computed, onUnmounted, provide, ref, watchEffect } from 'vue';
import Loading from '@/components/Loading.vue';
import SimplePostCard from '@/components/SimplePostCard.vue';
import LikePost from '@/features/LikePostFeature.vue';
import Comments from './Comments.vue';
import CreateCommentFeature from '@/features/CreateCommentFeature.vue';
import LayoutLeft from '@/components/LayoutLeft.vue';
import LayoutRight from '@/components/LayoutRight.vue';
import LayoutCenter from '@/components/LayoutCenter.vue';

provide('isComment', false)

onUnmounted(() => {
  store.posts = []
})

const store = postStore()
const router = useRouter()
const inputRef = ref<InstanceType<typeof CreateCommentFeature> | null>(null)
const isLoading = ref(true)
const postId = computed(() => router.currentRoute.value.params.id as string)
const postDetail = computed(() => store.posts[0])
const comments = computed(() => store.comments)

const findPost = async () => {
  try {
    await store.getOnePost(postId.value)
    setTimeout(() => isLoading.value = false, 300)
  } catch (err) {
    console.log("err : ", err);
    router.push("/")
  }
}

watchEffect(async () => {
  await findPost()
})

</script>