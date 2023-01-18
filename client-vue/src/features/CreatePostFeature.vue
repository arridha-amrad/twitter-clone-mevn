<template>
  <form ref="postFormRef" @submit.prevent="submit">
    <div class="mb-3">
      <textarea v-model="body" style="resize: none" placeholder="Write your tweet..." class="form-control"
        rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit" class="btn btn-primary">Create Post</button>
  </form>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { ref } from 'vue';
import { showToast } from "@/utils/toastHandler"

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
    showToast("Post created successfully")
  } catch (err) {
    console.log("err : ", err)
  } finally {
    isLoading.value = false
  }
}

</script>