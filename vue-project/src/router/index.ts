// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ResourcesList from '@/components/ResourcesList.vue'
import ResourceDetails from '@/components/ResourceDetails.vue'
import SearchPage from '@/components/SearchPage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:group/',
    name: 'list',
    component: ResourcesList
  },
  {
    path: '/:group/:id',
    // path: '/:group/details/:id',
    name: 'details',
    component: ResourceDetails
  },
  {
    path: '/:group/search/&:name',
    name: 'search',
    component: SearchPage
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
