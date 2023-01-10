<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <textarea v-model="body" style="resize: none" placeholder="Write your tweet..." class="form-control"
        rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit" class="btn btn-primary">Create Post</button>
  </form>
  <div v-if="isShow" class="position-fixed fixed-bottom start-50 w-25 translate-middle-x">
    <div class="alert alert-primary text-center">New post created <strong>successfully</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { ref, watch } from 'vue';
const store = postStore()
const isLoading = ref(false)
const isShow = ref(false)
const body = ref("")
watch(
  isShow,
  (val) => val && setTimeout(() => { isShow.value = false }, 1000))

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