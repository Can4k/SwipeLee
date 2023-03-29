import { createRouter, createWebHistory } from 'vue-router'
import StatView from "@/views/StatView.vue";
import PlayView from "@/views/PlayView.vue";
import aboutView from "@/views/AboutView.vue";
import TrainView from "@/views/TrainView.vue";
import loginView from "@/views/LoginView.vue";

const routes = [
  {
    path: '/play',
    name: 'playground',
    component: TrainView
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
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/play',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
