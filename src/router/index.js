import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard,meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem("authToken");

  if (to.meta.requiresAuth && !authToken) {
    next("/login");
  } else {
    next(); 
  }
});

export default router;
