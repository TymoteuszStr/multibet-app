import type { RouteRecordRaw } from "vue-router";

const MenuLayout = () => import("@/layouts/MainLayout.vue");
const HomePage = () => import("@/pages/HomePage.vue");
const MainDashboard = () => import("@/components/MainDashboard.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MenuLayout,
    children: [
      {
        path: "",
        component: HomePage,
        children: [
          {
            path: ":id",
            name: "MainDashboard",
            component: MainDashboard,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/:catchAll(.*)*",
  //   component: ErrorNotFoundPage,
  // },
];

export default routes;
