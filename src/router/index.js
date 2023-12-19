import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/hbc/'),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '表单模板',
        keepAlive: false
      },
      component: () => import('@/component/Hell')
    }
  ]
})
export default router
