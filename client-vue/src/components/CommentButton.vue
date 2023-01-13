<template>
  <button @click="isShow = true" type="button" class="btn btn-outline-success btn-sm">
    {{ post._count.children }} Comments
  </button>
  <Modal :is-show="isShow" :close-modal="closeModal">
    <div class="card border-0 w-100 mb-3 p-0" role="button">
      <div class="card-body d-flex gap-3 align-items-start">
        <img class="avatar rounded-circle border" :src="avatar" alt="avatar">
        <div id="post-content" class="flex-fill">
          <div class="d-flex align-items-center gap-2 text-black-50 fs-6">
            <div class="fw-bold ">{{ post.author.username }}</div>
            <div class="">{{ date }}</div>
          </div>
          <p class="card-text">{{ post.body }}</p>
        </div>
      </div>
    </div>
    <div>
      <CreateCommentFeature @closeCurrModal="closeModal" :postId="post.id" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from './Modal.vue';
import CreateCommentFeature from '@/features/CreateCommentFeature.vue';
import { IPostWithParents } from '@/stores/types/post.types';
import timeSetter from '@/utils/timeSetter';

const isShow = ref(false)
const closeModal = () => isShow.value = false

const props = defineProps<{ post: IPostWithParents }>()
const avatar = computed(() => {
  const url = props.post.author.imageURL
  if (url === "default") return "/default.png"
  return url
})
const date = computed(() => timeSetter(props.post.createdAt.toString()))
</script>
