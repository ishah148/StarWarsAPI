// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PeopleList from '@/components/PeopleList.vue'
import PeopleDetails from '@/components/PeopleDetails.vue'
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
    component: PeopleList
  },
  {
    path: '/:group/search/:name',
    name: 'search',
    component: SearchPage
  },
  {
    // path: '/:group/details/:item',
    path: '/:group/:id',
    name: 'details',
    component: PeopleDetails
    // props: {
    //   props: (route) => {
    //     console.log('entered route')
    //     console.log(route)
    //     return { ...route.params }
    //   }
    // }
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
