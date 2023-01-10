<template>
  <main class="bg-body-tertiary">
    <div class="container ">
      <div class="row">
        <div class="col-lg-3 bg-primary vh-100">a</div>
        <div class="col-lg-5 p-3 position-relative">
          <CreatePostFeature />
          <div class="my-5">
            <hr />
          </div>
          <LoadPostsFeature />
        </div>
        <div class="col-lg-4 bg-danger">c</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import authStore from '@/stores/authStore';
import { useRouter } from 'vue-router';
import CreatePostFeature from "@/features/CreatePostFeature.vue"
import LoadPostsFeature from '@/features/LoadPostsFeature.vue';
const store = authStore()
const router = useRouter()

const loggingOut = async () => {
  try {
    await store.logout()
  } catch (error) {
    console.log("err : ", error);
  } finally {
    router.replace("/login")
  }
}

</script>
