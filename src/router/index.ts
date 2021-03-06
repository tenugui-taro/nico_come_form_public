import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import firebase from "@/configs/firebase";
import { signIn } from "@/store/signIn";

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
    path: "*" /*[todo] notfound 404を用意 */,
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
        signIn.value = true;
        next();
      } else {
        // サインインしていない -> ログインページへリダイレクト
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
