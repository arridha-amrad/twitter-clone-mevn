<template>
  <form @submit.prevent="submit" class="d-flex flex-column gap-1">
    <div v-if="alertMessage" :class="['alert', alertType]" role="alert">{{ alertMessage }}</div>
    <Input type="text" label-text="Email Address" id="email" v-model="email" />
    <Input type="text" label-text="Username" id="username" v-model="username" />
    <Input :type="toggleType" label-text="Password" id="password" v-model="password" />
    <CheckBox v-model="isShowPassword" label-text="Show Password" />
    <button :disabled="isLoading" type="submit" class="btn btn-primary btn-lg mt-3">
      Register
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Input from "@/components/Input.vue";
import CheckBox from "@/components/CheckBox.vue";
import authStore from "@/stores/authStore";
const store = authStore()
const username = ref("");
const email = ref("");
const password = ref("");
const alertMessage = ref("")
const isShowPassword = ref(false);
const isAlertSuccess = ref(true)
const isLoading = ref(false)

const alertType = computed(() => isAlertSuccess.value ? "alert-success" : "alert-danger")
const toggleType = computed(() => (isShowPassword.value ? "text" : "password"));

const submit = async () => {
  const u = username.value;
  const e = email.value;
  const pwd = password.value;
  if (!u || !e || !pwd) return
  try {
    isLoading.value = true
    const result = await store.register({
      email: e,
      password: pwd,
      username: u
    })
    alertMessage.value = result.message
    isAlertSuccess.value = true
    username.value = ""
    email.value = ""
    password.value = ""
  } catch (err: any) {
    alertMessage.value = err.data.message
    isAlertSuccess.value = false
  } finally {
    isLoading.value = false
  }
};
</script>