import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Preview from '../views/Preview.vue'
import Lobby from '../views/Lobby.vue'

const routes = [
  { path: '/', name: 'Root', component: Home },
  { path: '/Home', name: 'Home', component: Home },
  { path: '/Preview', name: 'Preview', component: Preview },
  { path: '/Lobby', name: 'Lobby', component: Lobby }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
