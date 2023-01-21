import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "./styles/index.css";

createApp(App)
  .provide("isComment", false)
  .use(createPinia())
  .use(router)
  .mount("#app");
