import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    props:true,
    children: [
      {
        path: '',
        name: 'main',
        redirect: '/routes'
      },
      {
        path: '/routes',
        name: 'Routes',
        component: () => import('../views/RoutesPage.vue'),
      },
      {
        path: '/route',
        name: 'Route',
        props:true,
        component: () => import('../views/RoutePage.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/ProfilePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
