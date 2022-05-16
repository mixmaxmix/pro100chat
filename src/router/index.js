import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import СhannelsView from '../views/СhannelsView.vue'
import СhannelView from '../views/СhannelView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/channels',
      name: 'channels',
      component: СhannelsView,
      props: true
    },
    {
      path: '/channel/:id',
      name: 'channel',
      component: СhannelView,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
