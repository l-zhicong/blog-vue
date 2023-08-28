<template>
  <div id="app">
    <Login />
    <router-view/>
  </div>
</template>

<script>
import {  MessageBox } from 'element-ui'
import Login from './view/user/login.vue'
export default {
  name: 'App',
  components:{
    Login
  },
  mounted(){
    let mes = "带宽不是很大，加载资源耐心等待"
    // MessageBox.confirm(mes, '温馨提示')xw
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
