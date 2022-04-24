<template>
  <header class="navbar">
    <section class="box header-content">
      <router-link
        v-for="item in nav"
        ref="tag"
        :key="item.path"
        :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
        tag="span"
        class="tags-view-item"
      >
        {{ item.text }}
    </router-link>
    </section>
  </header>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
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
          path: '/music',
          text: '音乐'
        },
        {
          path: '/notice',
          text: '征婚'
        },
        {
          path: '/about',
          text: '关于'
        },
      ]
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  line-height: 50px;
  position: relative;
  //background: #ff0000;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.box {
  width: 50%;
  //margin: 0 auto;
}

.header-content {
  display: flex;
  height: 59px;
  justify-content: space-between;
  width: 100%;
}

.header-content .tags-view-item {
  width: 100px;
  cursor:pointer;
  display: inline-block;
  height: 59px;
  transition: 0.3s;
  padding: 0 20px;
  //position: relative;
  color: #8c8c8c;
  text-decoration: none;
}

.header-content  .tags-view-item:hover {
  //color: #3fb76c;
  background-color: #3e3e3e;
}
</style>
