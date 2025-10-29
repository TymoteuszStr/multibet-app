import type { RouteRecordRaw } from "vue-router";

const MenuLayout = () => import("../layouts/MainLayout.vue");
const HomePage = () => import("../pages/HomePage.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MenuLayout,
    children: [
      {
        path: "",
        component: HomePage,
      },
    ],
  },
  // {
  //   path: "/:catchAll(.*)*",
  //   component: ErrorNotFoundPage,
  // },
];

export default routes;
