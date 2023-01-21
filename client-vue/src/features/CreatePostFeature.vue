<template>
  <form ref="postFormRef" @submit.prevent="submit">
    <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div class="bg-white rounded-t-lg dark:bg-gray-800">
        <textarea v-model="body" id="comment" rows="4" class="textarea" placeholder="Write a comment..."></textarea>
      </div>
      <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <button :disabled="isLoading" type="submit" class="btn btn-primary">
          Post
        </button>
        <div class="flex pl-0 space-x-1 sm:pl-2">
          <button type="button"
            class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-slate-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Upload image</span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { ref } from 'vue';

const store = postStore()
const isLoading = ref(false)
const isShow = ref(false)
const body = ref("")

const postFormRef = ref<HTMLFormElement>()
defineExpose({ postFormRef })

const submit = async () => {
  const b = body.value
  if (!b) return
  try {
    isLoading.value = true
    await store.createPost(b)
    isShow.value = true
    body.value = ""
  } catch (err) {
    console.log("err : ", err)
  } finally {
    isLoading.value = false
  }
}

</script>