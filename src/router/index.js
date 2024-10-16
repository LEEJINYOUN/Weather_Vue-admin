import { createWebHistory, createRouter } from "vue-router";
import dashboard from "@/pages/master/dashboard.vue";
import home from "@/pages/home/home.vue";
import user from "@/pages/users/user.vue";
import clothes from "@/pages/clothes/clothes.vue";
import country from "@/pages/countries/country.vue";

const routes = [
  {
    name: "dashboard",
    path: "/",
    component: dashboard,
    children: [
      {
        name: "home",
        path: "/home",
        component: home,
      },
      {
        name: "users",
        path: "/users",
        component: user,
      },
      {
        name: "clothes",
        path: "/clothes",
        component: clothes,
      },
      {
        name: "country",
        path: "/country",
        component: country,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
