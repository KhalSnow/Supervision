import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import Login from '@/components/Login/Login.vue'
import store from '@/vuex/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      hidden: true
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/user',
      meta: {
        requireAuth: true
      },
      component: Layout,
      children: [
        {
          path: '/user',
          component: () => import('@/components/User/User.vue')
        }
      ]
    }
  ]
})

export default router
