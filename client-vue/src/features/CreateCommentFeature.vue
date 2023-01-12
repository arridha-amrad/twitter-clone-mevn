<template>
  <form @submit.prevent="submit" class="d-flex flex-column gap-2">
    <div :class="isDetailPage ? 'mb-0' : 'mb-3'">
      <textarea ref="commentInput" v-model="body" style="resize: none" placeholder="Write your reply..."
        :class="['form-control', isDetailPage ? 'border-0 bg-body-tertiary' : '']" rows="3"></textarea>
    </div>
    <button :disabled="isLoading" type="submit"
      :class="['btn', 'btn-primary', 'align-self-end', isDetailPage ? 'btn-sm' : '']">Create
      Comment</button>
  </form>
</template>

<script setup lang="ts">
import postStore from '@/stores/postStore';
import { showToast } from '@/utils/toastHandler';
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
    await store.createComment({
      body: b,
      postId: props.postId
    }, isPostDetailPage, isComment.value)
    emits('closeCurrModal')
    showToast('Comment added successfully')
    body.value = ""
  } catch (err) {
    console.log("err : ", err);
  } finally {
    isLoading.value = false
  }
}
</script>