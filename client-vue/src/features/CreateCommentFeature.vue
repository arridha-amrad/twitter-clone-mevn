<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2">
    <div :class="isDetailPage ? 'mb-0' : 'mb-3'">
      <textarea ref="commentInput" v-model="body" placeholder="Write your reply..." class="
        w-full rounded-lg border-0 bg-white px-3 text-sm text-gray-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 md:text-base
        " rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit" class="
      self-end rounded-lg px-5 py-1.5 text-sm font-medium outline-none transition duration-200 ease-in focus:ring-4 md:text-base bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-400
      ">
      Comment</button>
  </form>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { inject, ref, } from 'vue';
import { useRouter } from 'vue-router';

const emitName = 'closeCurrModal'
const props = defineProps<{ postId: string, isDetailPage?: boolean }>()
const emits = defineEmits<{ (e: typeof emitName): void }>()
const commentInput = ref<HTMLTextAreaElement>()
defineExpose({ commentInput })
const store = postStore()
const body = ref("")
const isLoading = ref(false)
const router = useRouter()

const isPostDetailPage = router.currentRoute.value.name === "PostDetail";

const isComment = ref(inject('isComment') as boolean)

const submit = async () => {
  const b = body.value
  if (!b) return
  try {
    isLoading.value = true
    emits('closeCurrModal')
    await store.createComment({
      body: b,
      postId: props.postId
    }, isPostDetailPage, isComment.value)
    body.value = ""
  } catch (err) {
    console.log("err : ", err);
  } finally {
    isLoading.value = false
  }
}
</script>