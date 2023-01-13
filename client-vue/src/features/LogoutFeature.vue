<template>
  <button @click="isShow = true" class="btn btn-warning">Logout</button>
  <Modal :is-show="isShow" :close-modal="close">
    <div class="d-flex justify-content-center align-items-center flex-column gap-2">
      <h2>Are you sure to logout?</h2>
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

const close = () => {
  isShow.value = false
}

const uStore = authStore()
const pStore = postStore()
const router = useRouter()

const loggingOut = async () => {
  try {
    await uStore.logout()
    pStore.posts = []
    router.replace("/login")
  } catch (err) {

  }
}
</script>