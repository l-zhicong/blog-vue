<template>
  <div class="article-box">
    <h1 class="article-nav">
      头部
      {{title}}
    </h1>
    <section>
      <div class="article-content" v-html="content">
      </div>
    </section>
  </div>
</template>

<script>
import {getArticleInfo} from '@/api'
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
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
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
  padding: 0 20%;
}
</style>
