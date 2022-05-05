// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lax from 'lax.js'
import {Progress,Row,Col,Input,Button,Pagination,Radio,Drawer,Slider,Dropdown,DropdownMenu,DropdownItem,Loading} from 'element-ui'

Vue.config.productionTip = false
Vue.use(lax)
Vue.use(Progress)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(Drawer)
Vue.use(Slider)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading)
import '@/styles/index.scss' // 全局 css

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
