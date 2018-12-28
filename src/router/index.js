import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import User from '@/components/User/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      hidden: true
    },
    // {
    //   path: '/home',
    //   component: Login
    // },
    // {
    //   path: '/signup',
    //   component: Signup
    // },
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
