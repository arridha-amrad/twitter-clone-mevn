<template>
  <form @submit.prevent="submit" class="d-flex flex-column gap-2">
    <div class="mb-3">
      <textarea v-model="body" style="resize: none" placeholder="Write your reply..." class="form-control"
        rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit" class="btn btn-primary align-self-end">Create Comment</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ postId: string }>()

const body = ref("")
const isLoading = ref(false)
const submit = async () => {
  console.log("post ID : ", props.postId);
}
</script>