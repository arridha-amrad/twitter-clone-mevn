<template>
  <form ref="postFormRef" @submit.prevent="submit">
    <div class="w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-700">
      <div class="bg-white rounded-t-lg dark:bg-gray-800">
        <textarea :disabled="isLoading" v-model="body" id="comment" rows="4" class="
          w-full rounded-lg border-0 bg-white px-3 text-sm text-gray-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 md:text-base
          " placeholder="Write a post..."></textarea>
      </div>
      <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
        <button :disabled="isLoading" type="submit"
          class="rounded-lg px-5 py-1.5 text-sm font-medium outline-none disabled:cursor-wait transition duration-200 ease-in focus:ring-4 md:text-base bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300  dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-400 disabled:bg-blue-400">
          <span v-if="!isLoading">Post</span>
          <Spinner v-else>
            <span>loading...</span>
          </Spinner>
        </button>
        <div class="flex pl-0 space-x-1 sm:pl-2 items-center">
          <PreviewImages :files-to-preview="filesToPreview" />
          <input @input="fileInputChange" class="absolute hidden" multiple="true" type="file" ref="fileInputRef" />
          <Tooltip tip="add images">
            <button :disabled="isLoading" @click="fileInputRef?.click" type="button"
              class="inline-flex disabled:cursor-wait justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-slate-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
              <ImageIcon class="w-5 h-5" />
              <span class="sr-only">Upload image</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import postStore from "@/stores/postStore";
import { ref } from "vue";
import ImageIcon from "@heroicons/vue/24/outline/PhotoIcon"
import Spinner from "@/components/Spinner.vue";
import PreviewImages from "@/components/PreviewImages.vue";
import uiStore from "@/stores/uiStore";
import Tooltip from "@/components/Tooltip.vue";

const store = postStore();
const isLoading = ref(false);
const body = ref("");
const filesToPreview = ref<string[]>([])
const filesToUpload = ref<File[]>([])
const fileInputRef = ref<HTMLInputElement>()

const fileInputChange = (e: any) => {
  filesToPreview.value = []
  filesToUpload.value = []
  const images = fileInputRef.value?.files
  if (!images) return
  for (let i = 0; i < images.length; i++) {
    const url = URL.createObjectURL(images[i])
    const image = images[i]
    filesToPreview.value.push(url)
    filesToUpload.value.push(image)
  }
}

const postFormRef = ref<HTMLFormElement>();
defineExpose({ postFormRef });

const uS = uiStore()

const submit = async () => {
  const b = body.value;
  if (!b) return;
  try {
    const formData = new FormData()
    isLoading.value = true;
    formData.append("text", b)
    filesToUpload.value.map((file) => formData.append("images", file))
    await store.createPost(formData)
    body.value = "";
    filesToPreview.value = []
    filesToUpload.value = []
    formData.delete("text")
    formData.delete("images")
    uS.setToast("new post created")
  } catch (err) {
    console.log("err : ", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
