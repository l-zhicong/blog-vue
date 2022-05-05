<template>
  <div class="article-info-box">
    <div class="article-box">
      <h1 class="article-nav">
        {{title}}
      </h1>
      <section class="content-box" ref="content">
        <div class="article-content" v-html="content">
        </div>
      </section>
    </div>
  </div>

</template>

<script>
import {getArticleInfo} from '@/api'
import * as THREE from 'three'
import Net from 'vanta/dist/vanta.net.min'
export default {
  name: "info",
  data() {
    return {
      title:"",
      content:""
    }
  },
  methods:{
    getInfo(){
      getArticleInfo(this.$route.params.id).then(res =>{
        this.title = res.data.title
        this.content = res.data.content.content
        this.renderNet()
      })
    },
    renderNet(){
      let height = this.$refs.content.offsetHeight
      let width = this.$refs.content.offsetWidth
      this.vantaEffect = Net({
        el: this.$refs.content,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: 0xffffff,
        minHeight: height,
        minWidth: width
      })
    }
  },
  mounted() {
    this.getInfo()
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
}
</script>

<style scoped>
.article-info-box{
  height: 100%;
  width: 100%;
}

.article-box{
  /*background-image: url("../../assets/img/aside-bg.jpg");*/
}
.article-nav{
  height: 200px;
  background-color: #2b9aff;
  margin: 0 auto;
  text-align: center
}
.article-content{
  margin: 0 auto;
  padding: 0 20%;
  font-size: 20px;
}

.content-box{
  width: 100%;
  height: 100%;
}
</style>
