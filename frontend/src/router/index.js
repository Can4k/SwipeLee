import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue";
import StatView from "@/views/StatView.vue";
import PlayView from "@/views/PlayView.vue";
import aboutView from "@/views/AboutView.vue";

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/stat',
    name: 'stat',
    component: StatView
  },
  {
    path: '/play/:type',
    name: 'play',
    component: PlayView
  },
  {
    path: '/about',
    name: 'about',
    component: aboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
