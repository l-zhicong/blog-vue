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
      path: '/article',
      name: 'article',
      component: () => import('../view/article/index'),
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('../view/music/index'),
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('../view/music/index'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../view/about/index'),
      meta:{
        title:"关于我"
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../layouts/index'),
    },
    {
      path: '/index',
      name: 'index',
      component: Layout,
      children: [
        {
          path: '/index/music',
          name: 'music',
          component: () => import('../view/music/index'),
          meta: {
            activeMenu: '/music'
          },
        },
      ]
    }
  ]
})
