<template>
  <button @click="openModal" type="button" class="btn btn-outline-success btn-sm">
    {{ post._count.children }} Comments
  </button>
  <Modal :modal-id="modalId">
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
    <CreateCommentFeature @closeCurrModal="closeModal" :postId="post.id" />
  </Modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Modal from './Modal.vue';
import CreateCommentFeature from '@/features/CreateCommentFeature.vue';
import { Modal as Mdl } from "bootstrap"
import { IPostWithParents } from '@/stores/types/post.types';
import timeSetter from '@/utils/timeSetter';

const props = defineProps<{ post: IPostWithParents }>()
const avatar = computed(() => {
  const url = props.post.author.imageURL
  if (url === "default") return "/default.png"
  return url
})
const modalId = computed(() => `modal-${props.post.id}`)
const date = computed(() => timeSetter(props.post.createdAt.toString()))

const mm = ref<HTMLElement | null>(null)
const mdl = ref<Mdl | null>(null)

onMounted(() => {
  mm.value = document.getElementById(modalId.value)
  mdl.value = new Mdl(mm.value!)
})

const closeModal = () => {
  mdl.value?.hide()
}
const openModal = () => {
  mdl.value?.show()
}

</script>
