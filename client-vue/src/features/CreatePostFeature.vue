<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <textarea v-model="body" style="resize: none" placeholder="Write your tweet..." class="form-control"
        rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit" class="btn btn-primary">Create Post</button>
  </form>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { ref, watch } from 'vue';

const store = postStore()
const isLoading = ref(false)
const isShow = ref(false)
const body = ref("")
const toastMessage = ref("")
const toastType = ref<"success" | "error">("error")

watch(
  isShow,
  (val) => {
    if (val) {
      setTimeout(() => {
        isShow.value = false;
        toastMessage.value = ""
        toastType.value = "success"
      }, 5000)
    }
  })

const submit = async () => {
  const b = body.value
  if (!b) return
  try {
    isLoading.value = true
    await store.createPost(b)
    isShow.value = true
    toastMessage.value = "New tweet created successfully"
    toastType.value = "success"
    body.value = ""
  } catch (err) {
    console.log("err : ", err)
    toastMessage.value = "Failed to create tweet"
    toastType.value = "error"
  } finally {
    isLoading.value = false
  }
}

</script>