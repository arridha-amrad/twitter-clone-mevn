<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2">
    <Alert
      v-show="alert.message !== ''"
      :message="alert.message"
      :type="alert.type"
    />
    <Input
      ref="input"
      type="text"
      label-text="Email Address"
      id="email"
      v-model="state.email"
    />
    <Input
      type="text"
      label-text="Username"
      id="username"
      v-model="state.username"
    />
    <Input
      :type="toggleType"
      label-text="Password"
      id="password"
      v-model="state.password"
    />
    <CheckBox v-model="isShowPassword" label-text="Show Password" />
    <button :disabled="isLoading" type="submit" class="btn btn-primary">
      <Spinner v-if="isLoading">loading...</Spinner>
      <span v-else>Register</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import Input from "@/components/Input/InputFloatingLabel.vue";
import CheckBox from "@/components/CheckBox.vue";
import authStore from "@/stores/authStore";
import Spinner from "@/components/Spinner.vue";
import Alert, { TAlert } from "@/components/Alert.vue";

const store = authStore();

const input = ref<InstanceType<typeof Input> | null>();

onMounted(() => {
  input.value?.input?.focus();
});

const state = reactive({
  username: "",
  email: "",
  password: "",
});

const alert = reactive<{ message: string; type: TAlert }>({
  message: "",
  type: "error",
});

const isShowPassword = ref(false);
const isLoading = ref(false);

const toggleType = computed(() => (isShowPassword.value ? "text" : "password"));

const submit = async () => {
  const { email, password, username } = state;
  if (!username || !email || !password) return;
  try {
    isLoading.value = true;
    const result = await store.register({
      email,
      password,
      username,
    });
    alert.message = result.message;
    alert.type = "success";
    state.email = "";
    state.password = "";
    state.username = "";
  } catch (err: any) {
    alert.message = err.data.message;
    alert.type = "error";
  } finally {
    isLoading.value = false;
  }
};
</script>
