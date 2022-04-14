<template>
  <header class="navbar">
    <section class="box header-content navbar">
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
          path: '/project',
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
  //position: relative;
  //background: #ff0000;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.box {
  width: 900px;
  margin: 0 auto;
}

.header-content {
  display: flex;
  height: 59px;
  justify-content: space-between;
}

.header-content .tags-view-item {
  display: inline-block;
  height: 59px;
  transition: 0.3s;
  padding: 0 20px;
  position: relative;
  color: #8c8c8c;
  text-decoration: none;
}

.header-content  .tags-view-item:hover {
  //color: #3fb76c;
  background-color: #3e3e3e;
}
</style>
