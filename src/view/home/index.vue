<template>
  <div class="homePage">
    <section id="aside">
      <div class="aside-box">
        <div class="marsk"></div>
        <div class="aside-content">
          <a>
            <img src="../../assets/img/averter.jpg" alt="">
          </a>
          <h1>
            <a>Tobapnw：</a>
            <a>想过成功，想过失败，但从没想过放弃。</a>
          </h1>
          <slot></slot>
          <div class="aside-icon">
            <a href="https://github.com/L-zhicong">
              <i class="iconfont">&#xe885;</i>
            </a>
            <a href="https://www.jianshu.com/u/6797ba121247">
              <i class="iconfont">&#xe8a2;</i>
            </a>
            <a href="https://registry.hub.docker.com/search?q=xiaoyaoguai">
              <i class="iconfont">&#xe9f3;</i>
            </a>
          </div>
        </div>
      </div>
    </section>
    <div class="home-view">
      <section class="aboutMe">
          <a  @click="toArticle">
            <span class="is-display">文章</span>
          </a>
          <a @click="toMusic">
            <span class="is-display">音乐</span>
          </a>
          <a @click="toProject">
            <span class="is-display">征婚</span>
          </a>
          <a @click="toAbout">
            <span class="is-display">关于</span>
          </a>
      </section>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "@/layouts/components/Bottom";
import {mapMutations} from "vuex";
export default {
  components: {
    Bottom
  },
  head () {
    return {
      title: 'naice | 首页'
    }
  },
  methods: {
    ...mapMutations(['user/showLogin']),
    toArticle() {
      this.$router.push("article")
    },
    toMusic() {
      this.$router.push("music")
    },
    toProject() {
      this.$store.dispatch("user/showLogin")
      // this.$router.push("notice")
    },
    toAbout() {
      this.$router.push("about")
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
:root {
  --fontColor: #5e5e5e; /*文字颜色*/
  --titleColor: #3e3e3e; /*标题颜色*/
  --lineColor: #3fb76c; /*线条绿色*/
}

.homePage {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}

#aside {
  width: 100%;
  height: 70%;
  background: url("../../assets/img/aside-bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  transition: height 2s;
}
#aside:hover
{
  height:100%;
}

.home-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 30%;
  width: 100%;
  position: absolute;
  top: 70%;
}

.aboutMe {
  width: 50%;
  /*border: 1px solid red;*/
  height: 50%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.aboutMe a{
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 100px;
  font-size: 18px;
  color: #333;
  text-decoration: none;
  transition: background 0.5s;
  border-radius: 50%;
  background-color: #9a6e3a;
  box-shadow: 2px 2px 5px #6c6c6c;
}

.aboutMe a:hover{
  background: #3fb76c;
  color: #fff;
  border-color: #3fb76c;
  width: 150px;
  height: 150px;
}

.aside-box {
  /*width: 100%;*/
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7) url("../../assets/img/aside-bg.jpg") no-repeat center center;
  background-size: auto 100%;
}

.marsk {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
}

.aside-content {
  width: 400px;
  height: 400px;
  /*border: 1px solid red;*/
  text-align: center;
  position: relative;
  z-index: 2;
}

.aside-content img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: transform 0.5s;
  cursor: pointer;
}

.aside-content img:hover {
  transform: rotate(360deg);
  box-shadow: 0 0 30px rgba(0, 255, 249, 0.57);
}

.aside-content h1 {
  color: var(--titleColor);
  font-size: 22px;
  padding-top: 16px;
  padding-bottom: 30px;
}

.aside-content h1 a{
  color: var(--titleColor);
  font-size: 22px;
  text-decoration: none;
}

.aside-content h1:after {
  content: '';
  display: block;
  height: 1px;
  width: 200px;
  margin: 0 auto;
  background: var(--lineColor);
  margin-top: 15px;
}

.aside-content p {
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: var(--fontColor);
}

.aside-icon {
  clear: both;
  display: flex;
  justify-content: center;
}

.aside-icon a {
  width: 34px;
  height: 34px;
  background-color: #5e5e5e;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 2px;
  color: #fff;
  text-decoration: none;
  text-align: center;
  line-height: 34px;
}

.aside-icon a:hover {
  background-color: var(--lineColor);
}
</style>
