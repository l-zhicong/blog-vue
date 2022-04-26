<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {  MessageBox } from 'element-ui'
export default {
  name: 'App',
  mounted(){
    let mes = "带宽不是很大，加载资源耐心等待"
    MessageBox.confirm(mes, '温馨提示')
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
