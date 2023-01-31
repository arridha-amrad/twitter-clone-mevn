<template>
  <button
    class="flex gap-2 rounded-lg px-5 py-1.5 text-sm font-medium outline-none transition duration-200 ease-in focus:ring-4 md:text-base bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300  dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-400 disabled:bg-blue-400"
    @click="showModal">
    <Icon class="w-5 h-5" />
    logout
  </button>
  <Modal :is-small-size="true" :is-show="isShow" :close-modal="close">
    <div class="flex flex-col gap-2">
      <h1 class="font-bold text-xl">Are you sure to logout?</h1>
      <div class="mx-auto space-x-8 mt-6">
        <button @click="loggingOut" class="font-bold text-blue-500">Logout</button>
        <button @click="close" class="text-gray-700 dark:text-gray-200">Cancel</button>
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
import Icon from "@heroicons/vue/24/outline/ArrowLeftOnRectangleIcon"

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