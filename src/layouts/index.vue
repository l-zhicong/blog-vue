<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar />
      <app-main />
      <Bottom />
    </div>
  </div>
</template>
<script>
import AppMain from '@/layouts/components/AppMain'
import Navbar from '@/layouts/components/Navbar'
import Bottom from "@/layouts/components/Bottom"
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Bottom
  },
  data () {
    return {
      nav: [
        {
          path: '/',
          text: '首页'
        },
        {
          path: '/article',
          text: '文章'
        },
        {
          path: '/notice',
          text: '项目'
        },
        {
          path: '/about',
          text: '关于'
        },
        {
          path: '/music',
          text: '音乐'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
@mixin clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>
