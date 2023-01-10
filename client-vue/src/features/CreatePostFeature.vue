<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <textarea v-model="body" style="resize: none" placeholder="Write your tweet..." class="form-control"
        rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit" class="btn btn-primary">Create Post</button>
  </form>

  <div class="position-absolute bottom-0 start-50 translate-middle-x">
    <div class="alert alert-success text-center">New post created <strong>successfully</strong></div>
  </div>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { ref } from 'vue';
const store = postStore()
const body = ref("")
const isLoading = ref(false)

const submit = async () => {
  const b = body.value
  if (!body) return
  try {
    await store.createPost(b)
  } catch (err) {
    console.log("err : ", err)
  }
}

</script>