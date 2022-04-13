// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Container,Header,Aside,Main,Footer,Menu} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)

import '@/styles/index.scss' // 全局 css

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
