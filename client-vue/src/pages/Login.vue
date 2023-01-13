<template>
  <main>
    <div class="container">
      <div class="row vh-100 d-flex justify-content-center align-items-center">
        <div class="col-lg-3 rounded-4 py-4 px-3">
          <h1 class="mb-3 fw-bold">Login</h1>
          <LoginFeature />
          <div class="d-flex align-items-center justify-content-between mt-3">
            <router-link class="text-decoration-none" to="/register">forgot password</router-link>
            <router-link class="text-decoration-none" to="/register">Register</router-link>
          </div>

          <!-- <ul class="d-flex flex-column">
            <li v-for="message in messages">
              <button @click="showModal" class="btn btn-primary">Show modal</button>
              <Modal modal-id="asdsa">
                <TestComponent :message="message" />
              </Modal>
            </li>
          </ul> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import LoginFeature from "@/features/LoginFeature.vue";
import { Modal as Mdl } from "bootstrap"
import TestComponent from "@/components/TestComponent.vue";

const messages = ["hi there", "hello world", "gunaydin"]

const showModal = () => {
  const modal = document.getElementById("app-modal")
  const mdl = new Mdl(modal!)
  const modalBody = document.getElementById("modal-body")
  mdl.show()
}
</script>
