<template>
  <div class="article-info-box" ref="ArtcleInfo">
    <div class="article-box">
      <h1 class="article-nav">
        {{title}}
      </h1>
      <section class="content-box" ref="content">
        <div  class="article-content" v-html="content">
        </div>
      </section>
    </div>
    <div class="comment-box">
      <h6>发表评论</h6>
      <reply-input :id="0" :article-id="Number(id)" v-model="textarea"></reply-input>
      <h6>评论列表({{commentNum}})</h6>
      <reply-list :articleId="Number(id)" :curIndex="curIndex" :list="replyList" @change="change"></reply-list>
    </div>
  </div>
</template>

<script>
import {getArticleInfo} from '@/api'
import * as THREE from 'three'
import Net from 'vanta/dist/vanta.net.min'
import ReplyList from './comment/repleyList'
import ReplyInput from './comment/reply'
export default {
  name: "info",
  components:{
    ReplyList,
    ReplyInput
  },
  data() {
    return {
      id:0,
      title:"",
      content:"",

      curIndex: 0,
      textarea: '', //回复内容
      replyList: [],
      commentNum:0,

      detailObj: {}
    }
  },
  methods:{
    getInfo(){
      getArticleInfo(this.id).then(res =>{
        this.title = res.data.title
        this.content = res.data.content.content
        this.replyList = res.data.comment
        this.commentNum = res.data.commentNum
        this.renderNet()
      })
    },
    renderNet(){
      let height = this.$refs.content.offsetHeight
      let width = this.$refs.content.offsetWidth
      this.vantaEffect = Net({
        el: this.$refs.ArtcleInfo,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: 0xffffff,
        minHeight: height,
        minWidth: width
      })
    },
    change(obj){
      this.curIndex = obj.id
      this.changeValById(this.replyList,obj.id)
    },
    // 重置
    changeValById(arr,id){
      if(!Array.isArray(arr)){
        return
      }
      arr.forEach(item => {
        this.$set(item,'reply','')
        if(item.id == id){
          this.$set(item,'showReply',!item.showReply)
        }else{
          this.$set(item,'showReply',false)
          this.changeValById(item.list,id)
        }
      })
    },
    replace(){

      this.getInfo()
    }
  },
  mounted() {
    this.id = this.$route.params.id
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


  table-layout: fixed;
  word-break: break-all;
  max-width: 100%;
}

.article-content >>> pre {
  word-wrap: break-word;
  white-space: pre-wrap;
}


.content-box{
  width: 100%;
  height: 100%;
}

.comment-box{
  position: relative;
  padding-top: 40px;
  margin-top: 40px;
  width: 60%;
  left: 20%;
  bottom: 20px;
}

.comment-box h6{
  font-size: 18px;
  margin: 0px 0 20px;
}
</style>
