import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./style.css";

createApp(App)
  .provide("isComment", false)
  .use(createPinia())
  .use(router)
  .mount("#app");
