// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Progress,Row,Col,Input,Button,Pagination} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Progress)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Pagination)

import '@/styles/index.scss' // 全局 css

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
