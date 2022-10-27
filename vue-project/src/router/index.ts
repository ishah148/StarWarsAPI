import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ResourcesList from "@/views/ResourcesList.vue";
import ResourceDetails from "@/views/ResourceDetails.vue";
import SearchPage from "@/views/SearchPage.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:group",
    name: "list",
    component: ResourcesList,
  },
  {
    path: "/:group/:id",
    name: "details",
    component: ResourceDetails,
  },
  {
    path: "/:group/search/:name",
    name: "search",
    component: SearchPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
