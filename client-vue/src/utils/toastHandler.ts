import { Toast } from "bootstrap";

export const showToast = (message: string) => {
  const liveToast = document.getElementById("liveToast");
  const toastBody = document.querySelector(".toast-body");
  toastBody!.textContent = message;
  const toast = new Toast(liveToast!);
  toast.show();
};
