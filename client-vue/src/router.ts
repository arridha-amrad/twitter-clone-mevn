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
    path: "/profile",
    component: lazyLoad("Profile"),
    meta: {
      protected: true,
    },
  },
  {
    path: "/posts/:id",
    component: () => import("./pages/PostDetail/PostDetail.vue"),
    name: "PostDetail",
    meta: {
      protected: true,
    },
  },
  {
    path: "/login",
    component: lazyLoad("Login"),
    meta: {
      protected: false,
    },
  },
  {
    path: "/register",
    component: lazyLoad("Register"),
    meta: {
      protected: false,
    },
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
  }
});

export default router;
