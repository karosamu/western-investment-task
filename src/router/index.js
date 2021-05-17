import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "User List",
      component: () => import("../views/UserListView.vue"),
    },
    {
      path: "/add",
      name: "Add User",
      component: () => import("../views/CreateUserView.vue"),
    },
    {
      path: "/edit/:id",
      name: "User Edit",
      props: true,
      component: () => import("../views/UpdateUserView.vue"),
    },
  ],
});

export default router;
