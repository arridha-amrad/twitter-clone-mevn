<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2">
    <div v-if="alertMessage" :class="['alert', alertType]" role="alert">{{ alertMessage }}</div>
    <Input ref="input" type="text" label-text="Email or Username" id="emailOrUsername" v-model="identity" />
    <Input :type="toggleType" label-text="Password" id="password" v-model="password" />
    <CheckBox v-model="isShowPassword" label-text="Show Password" />
    <button :disabled="isLoading" type="submit" class="btn btn-primary">
      <Spinner v-if="isLoading">loading...</Spinner>
      <span v-else>Register</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Input from "@/components/Input.vue";
import CheckBox from "@/components/CheckBox.vue";
import authStore from "@/stores/authStore";
import { useRouter } from "vue-router";
import Spinner from "@/components/Spinner.vue";
const router = useRouter()
const identity = ref("");
const password = ref("");
const alertMessage = ref("")
const isAlertSuccess = ref(false)
const isShowPassword = ref(false);
const isLoading = ref(false)
const alertType = computed(() => isAlertSuccess.value ? "alert-success" : "alert-danger")
const toggleType = computed(() => isShowPassword.value ? "text" : "password");
const store = authStore()

const input = ref<InstanceType<typeof Input> | null>(null)

onMounted(() => {
  input.value?.input?.focus()
})

const submit = async () => {
  const username = identity.value;
  const pwd = password.value;
  if (!username || !password) return
  try {
    isLoading.value = true
    await store.login({
      identity: username,
      password: pwd
    })
    router.replace("/")
  } catch (err: any) {
    alertMessage.value = err.data.message
    isAlertSuccess.value = false
  } finally {
    isLoading.value = false
  }
};
</script>