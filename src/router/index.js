import { createWebHistory, createRouter } from "vue-router";
import dashboard from "@/pages/master/dashboard.vue";
import User from "@/pages/users/user.vue";
import Clothes from "@/pages/clothes/clothes.vue";
import Country from "@/pages/countries/country.vue";
import Location from "@/pages/locations/location.vue";
import Home from "@/pages/home/home.vue";
import Register from "@/pages/auth/register.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
];

// const routes = [
//   {
//     name: "dashboard",
//     path: "/",
//     component: dashboard,
//     children: [
//       {
//         name: "home",
//         path: "/home",
//         component: Home,
//       },
//       {
//         name: "users",
//         path: "/users",
//         component: User,
//       },
//       {
//         name: "country",
//         path: "/country",
//         component: Country,
//       },
//       {
//         name: "location",
//         path: "/location",
//         component: Location,
//       },
//       {
//         name: "clothes",
//         path: "/clothes",
//         component: Clothes,
//       },
//     ],
//   },
// ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
