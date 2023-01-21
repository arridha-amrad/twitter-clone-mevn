<template>
  <form @submit.prevent="submit" class="flex flex-col gap-2">
    <div v-show="alert !== ''"
      class="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-gray-800 dark:text-red-400" role="alert">
      <p>{{ alert }}</p>
    </div>
    <Input ref="input" type="text" label-text="Email or Username" id="emailOrUsername" v-model="state.identity" />
    <Input :type="toggleType" label-text="Password" id="password" v-model="state.password" />
    <CheckBox v-model="isShowPassword" label-text="Show Password" />
    <button :disabled="isLoading" type="submit" class="btn btn-primary">
      <Spinner size="sm" v-if="isLoading">Loading...</Spinner>
      <span v-else>Login</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import Input from "@/components/Input.vue";
import CheckBox from "@/components/CheckBox.vue";
import authStore from "@/stores/authStore";
import { useRouter } from "vue-router";
import Spinner from "@/components/Spinner.vue";
const router = useRouter();

const alert = ref("");

const isShowPassword = ref(false);
const isLoading = ref(false);

const toggleType = computed(() => (isShowPassword.value ? "text" : "password"));
const store = authStore();

const input = ref<InstanceType<typeof Input> | null>(null);

const state = reactive({
  identity: "",
  password: "",
});

onMounted(() => {
  input.value?.input?.focus();
});

const submit = async () => {
  const { identity, password } = state;
  if (!identity || !password) return;
  try {
    isLoading.value = true;
    await store.login({
      identity,
      password,
    });
    router.replace("/");
  } catch (err: any) {
    alert.value = err.data.message;
    isLoading.value = false;
  } finally {
  }
};
</script>
