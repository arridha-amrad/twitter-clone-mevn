import { defineStore } from "pinia";

const uiStore = defineStore("ui", {
  state: () => ({
    toastMessage: "",
    isLoading: false,
    isDarkMode: false,
  }),
  actions: {
    setToast(text: string) {
      console.log("set toast...");
      this.toastMessage = text;
      setTimeout(() => {
        this.toastMessage = "";
        console.log("unSet toast...");
      }, 3000);
    },
    setLoading() {
      this.isLoading = true;
    },
    unsetLoading() {
      this.isLoading = false;
    },
  },
});

export default uiStore;
