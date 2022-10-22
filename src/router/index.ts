import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PeopleList from '@/components/PeopleList.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/peoples/:id',
    name: 'peoples',
    component: PeopleList
  },
  {
    path: '/peoples/:page',
    name: 'peoples',
    component: PeopleList
  }
  // {
  //   path: '/peoples/:page',
  //   name: 'peoples',
  //   component: PeopleList
  // },
  // {
  //   path: '/peoples/:id',
  //   name: 'peoples',
  //   component: PeopleList
  // }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
