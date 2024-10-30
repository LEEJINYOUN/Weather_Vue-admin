import { createWebHistory, createRouter } from "vue-router";
import User from "@/pages/users/user.vue";
import Clothes from "@/pages/clothes/clothes.vue";
import Country from "@/pages/countries/country.vue";
import Location from "@/pages/locations/location.vue";
import Home from "@/pages/home/home.vue";
import Dashboard from "@/pages/master/dashboard.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    children: [
      {
        name: "users",
        path: "/users",
        component: User,
      },
      {
        name: "country",
        path: "/country",
        component: Country,
      },
      {
        name: "location",
        path: "/location",
        component: Location,
      },
      {
        name: "clothes",
        path: "/clothes",
        component: Clothes,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
