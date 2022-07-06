import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import E404 from "./views/E404.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "*",
      component: E404
    }
  ]
});
