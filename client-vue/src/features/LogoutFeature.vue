<template>
  <button @click="showModal" class="btn btn-primary btn-sm">Logout</button>
  <Modal :is-small-size="true" :is-show="isShow" :close-modal="close">
    <div class="flex flex-col gap-2">
      <h1 class="font-bold text-xl">Are you sure to logout?</h1>
      <div class="mx-auto space-x-3">
        <button @click="loggingOut" class="btn btn-primary btn-sm">Logout</button>
        <button @click="close" class="btn border btn-sm">Cancel</button>
      </div>
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