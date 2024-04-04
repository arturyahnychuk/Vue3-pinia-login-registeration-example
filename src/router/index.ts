import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/account/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/account/Register.vue')
    }
  ]
})

export default router
