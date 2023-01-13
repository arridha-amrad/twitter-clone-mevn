<template>
  <button @click="showModal" data-bs-dismiss="offcanvas" class="btn btn-warning">Logout</button>
  <Modal :is-small-size="true" :is-show="isShow" :close-modal="close">
    <div class="d-flex justify-content-center align-items-center flex-column gap-2">
      <h5>Are you sure to logout?</h5>
      <button @click="loggingOut" class="btn btn-warning">Logout</button>
      <button @click="close" class="btn btn-secondary">Cancel</button>
    </div>
  </Modal>
</template>
  
<script script setup lang ="ts">
import authStore from '@/stores/authStore';
import postStore from '@/stores/postStore';
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

const isShow = ref(false)

const showModal = () => {
  isShow.value = true
}

const close = () => {
  isShow.value = false
}

const uStore = authStore()
const pStore = postStore()
const router = useRouter()

const loggingOut = async () => {
  try {
    await uStore.logout()
    close()
    pStore.posts = []
    router.replace("/login")
  } catch (err) {

  }
}
</script>