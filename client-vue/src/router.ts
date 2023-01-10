import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import authStore from "./stores/authStore";

const lazyLoad = (page: string) => {
  return () => import(`./pages/${page}.vue`);
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: lazyLoad("Home"),
    meta: {
      protected: true,
    },
  },
  {
    path: "/login",
    component: lazyLoad("Login"),
  },
  {
    path: "/register",
    component: lazyLoad("Register"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const authUserStore = authStore();
  if (to.meta.protected) {
    if (!authUserStore.isAuthenticated) {
      try {
        await authUserStore.getLoginUser();
        return {
          path: to.fullPath,
        };
      } catch (err) {
        return {
          path: "/login",
        };
      }
    }
  } else {
    // user not allowed to go to login/register page if they are authenticated
    if (
      (authUserStore.isAuthenticated && to.path === "/login") ||
      to.path === "/register"
    ) {
      return {
        path: from.fullPath,
      };
    }
  }
});

export default router;
