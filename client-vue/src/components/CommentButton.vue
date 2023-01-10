<template>
  <button @click="show" id="btn-modal" type="button" class="btn btn-outline-success btn-sm">
    {{ post._count.children }} Comments
  </button>
  <Modal />
</template>

<script setup lang="ts">
import { IPostWithParents } from '@/stores/post.types';
import timeSetter from '@/utils/timeSetter';
import { computed, ref, watch } from 'vue';

import postStore from '@/stores/postStore';

const avatar = computed(() => {
  const url = props.post.author.imageURL
  if (url === "default") return "/default.png"
  return url
})
const props = defineProps<{ post: IPostWithParents }>()
const myPost = ref<IPostWithParents | null>(null)
watch(() => props.post.id, (id) => {
  console.log("id : ", id);
  const currPost = store.posts.find((post) => post.id === id)
  if (currPost) {
    myPost.value = currPost
  }
})
const store = postStore()
const date = computed(() => timeSetter(props.post.createdAt.toString()))
const show = () => {
  isShow.value = true
  // const modalLiveExample = document.getElementById('exampleModal')
  // const modal = new Mdl(modalLiveExample!)
  // modal.show()
}
const isShow = ref(false)
</script>