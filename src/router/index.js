import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layouts/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../view/home/index'),
    },
    {
      path: '/',
      name: 'page',
      component: Layout,
      children: [
        {
          path: '/article',
          name: 'article',
          component: () => import('../view/article/index'),
        },
        {
          path: '/article/info/:id(\\d+)',
          name: 'articleInfo',
          component: () => import('../view/article/info'),
        },
        {
          path: '/music',
          name: 'music',
          component: () => import('../view/music/index'),
        },
        {
          path: '/notice',
          name: 'notice',
          component: () => import('../view/notice/index'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../view/about/index'),
          meta:{
            title:"关于我"
          }
        }
      ]
    }
  ]
})
