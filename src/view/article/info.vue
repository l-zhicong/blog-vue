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
    <div class="comment-box">
      <h6>发表评论</h6>
      <reply-input :id="''" v-model="textarea"></reply-input>
      <h6>评论列表({{replyList.length+1}})</h6>
      <reply-list :curIndex="curIndex" :list="replyList" @change="change"></reply-list>
    </div>
  </div>
</template>

<script>
import {getArticleInfo} from '@/api'
import * as THREE from 'three'
import Net from 'vanta/dist/vanta.net.min'
import ReplyList from './comment/index'
import ReplyInput from './comment/reply'
export default {
  name: "info",
  components:{
    ReplyList,
    ReplyInput
  },
  data() {
    return {
      title:"",
      content:"",

      curIndex: 0,
      textarea: 'sad',
      replyList: [],

      detailObj: {}
    }
  },
  methods:{
    getInfo(){
      getArticleInfo(this.$route.params.id).then(res =>{
        this.title = res.data.title
        this.content = res.data.content.content
        this.replyList = res.data.comment
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
    // 遍历添加唯一标识
    deepSetList(arr,level=1,parentLevel=''){
      if(!Array.isArray(arr)){
        return
      }
      return arr.map((item,i) => {
        let levelKey = level == 1 ? (i + 1) : parentLevel + '-' + (i + 1)
        return {
          ...item,
          showReply: false,
          reply: '',
          level: levelKey,
          list: this.deepSetList(item.list,level+1,levelKey)
        }
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

.comment-box{
  position: relative;
  padding-top: 40px;
  margin-top: 40px;
  width: 60%;
  left: 20%;
}

.comment-box h6{
  font-size: 18px;
  margin: 0px 0 20px;
}
</style>
