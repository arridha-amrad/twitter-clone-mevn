<template>
  <div class="position-relative">
    <button @click.stop="isShow = !isShow" class="btn">&bull;&bull;&bull;</button>
    <ul ref="menuRef" v-show="isShow" class="position-absolute top-0 start-0 list-group mt-3">
      <li @click.stop="openModal" class="list-group-item list-group-item-action">delete</li>
    </ul>
    <Modal :is-show="isShowModal" :close-modal="closeModal" :is-small-size="true">
      <div class="d-flex flex-column gap-2 justify-content-center align-items-center">
        <h1>Delete Post</h1>
        <button @click="deletePost" class="btn btn-primary">Yes</button>
        <button @click="closeModal" class="btn btn-secondary">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from "@vueuse/core"
import postStore from '@/stores/postStore';
import Modal from './Modal.vue';

const props = defineProps<{ postId: string }>()
const store = postStore()

const isShowModal = ref(false)
const openModal = () => isShowModal.value = true
const closeModal = () => isShowModal.value = false

const deletePost = async () => {
  try {
    await store.deletePost(props.postId)
    closeModal()
  } catch (err) {
  }
}

const menuRef = ref<HTMLUListElement>()
const isShow = ref(false)

onClickOutside(menuRef, () => isShow.value = false)

</script>