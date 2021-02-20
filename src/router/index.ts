import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import firebase from "@/configs/firebase";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "*" /*[HACK] 404pageが適切 */,
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user: ", user);
        next();
      } else {
        next({
          path: "/"
        });
      }
    });
  } else {
    next();
  }
});

export default router;
