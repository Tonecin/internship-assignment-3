import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilmsView from '@/views/films/FilmsView.vue'
import FilmView from '@/views/films/FilmView.vue'
import ActorsView from '@/views/actors/ActorsView.vue'
import ActorView from '@/views/actors/ActorView.vue'
import NotFound from '@/views/NotFound.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/films',
    name: 'films',
    component: FilmsView
  },
  {
    path: '/films/:id',
    name: 'film',
    component: FilmView
  },
  {
    path: '/actors',
    name: 'actors',
    component: ActorsView
  },
  {
    path: '/actors/:id',
    name: 'actor',
    component: ActorView
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
