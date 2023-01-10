<template>
  <form @submit.prevent="submit" class="d-flex flex-column gap-2">
    <div class="mb-3">
      <textarea v-model="body" style="resize: none" placeholder="Write your reply..." class="form-control"
        rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit" class="btn btn-primary align-self-end">Create
      Comment</button>
  </form>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { ref } from 'vue';

const emitName = 'closeCurrModal'
const props = defineProps<{ postId: string }>()
const emits = defineEmits<{ (e: typeof emitName): void }>()
const store = postStore()

const isShowToast = ref(false)
const body = ref("")
const isLoading = ref(false)
const toastMessage = ref("")
const toastType = ref<"error" | "success">("error")

const submit = async () => {
  const b = body.value
  if (!b) return
  try {
    isLoading.value = true
    await store.createComment({
      body: b,
      postId: props.postId
    })
    emits('closeCurrModal')
    isShowToast.value = true
    toastMessage.value = "Comment added successfully"
    toastType.value = "success"
    body.value = ""
  } catch (err) {
    console.log("err : ", err);
    toastMessage.value = "Failed to create comment"
    toastType.value = "error"
  } finally {
    isLoading.value = false
  }
}
</script>