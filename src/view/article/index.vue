<template>
  <div class="articleBox">
    <Category/>
    <section class="article" ref="scrollTopList">
        <div class="item" v-for="(item, index) of article" :key="index" @click="getArticleInfo(item.id)">
          <a href="javascript:void(0)" class="article-title" @click="">
            <h2>{{item.title}}</h2>
          </a>
          <p class="article-desc">{{item.content}}</p>
          <div class="article-info">
            <span class="time">{{item.createTime}}</span>
            <i class="iconfont">&#xe600;</i>
                <span class="time"><strong>{{item.read_num}}</strong>次阅读</span>
            <i class="iconfont">&#xe600;</i>
            <span class="time"><strong>{{item.comment_num}}</strong>条评论</span>
          </div>
        </div>
        <div class="loadmore" v-if="!hasMore">没有更多数据了</div>
        <div class="loadmore" v-else>
          <span v-if="isLoadingData">数据加载中...</span>
        </div>
    </section>
  </div>
</template>

<script>
import {Article} from "./data.js"
import Category from "@/view/article/category";
import {toTime} from "@/utils/time";

export default {
  data () {
    return {
      article: [],
      isLoadingData: false, //是否有数据
      hasMore: true, //是否还有数据
      devicePageSize: 10, //每页显示
      devicePageNum: 1, //当前页
      devicePageTotal: 0, //总条数
      devicePageTotalPages: 0, //总页数
      deviceListIsFinish: false, //是否加载完成
      deviceListIsLoad: false, //是否加载更多
      deviceTip: "",
    }
  },
  components:{
    Category
  },
  computed: {
  },
  methods: {
    getArticleList(){
      console.log("列表")
    },
    getArticleInfo(){
      console.log("详情")
    },
    handleScroll(){
      let scrollTop = this.$refs.scrollTopList.scrollTop,
        clientHeight = this.$refs.scrollTopList.clientHeight,
        scrollHeight = this.$refs.scrollTopList.scrollHeight,
        height = 50; //根据项目实际定义
      if(scrollTop +clientHeight >= scrollHeight - height){
        if(this.pageSize > this.total){
          return false
        }else{
          this.pageSize = this.pageSize +10 //显示条数新增
          this.getArticleList() //请求列表list 接口方法
        }
      }else{
        return false
      }
    },
    throttle(func, wait) {
      let lastTime = null
      let timeout
      return () => {
        let context = this;
        let now = new Date();
        let arg = arguments;
        if (now - lastTime - wait > 0) {
          if (timeout) {
            clearTimeout(timeout)
            timeout = null
          }
          func.apply(context, arg)
          lastTime = now
        } else if (!timeout) {
          timeout = setTimeout(() => {
            func.apply(context, arg)
          }, wait)
        }
      }
    },
  },
  mounted () {
    this.article = Article
    this.$refs.scrollTopList.addEventListener("scroll",this.throttle(this.handleScroll,500),true)
  },
}
</script>

<style scoped>
.list{
  width: 100px;
  height: 100px;
  /*clear: both;*/
  float: left;
  overflow: scroll;
}

.article {
  width: calc(100% - 20%);
  float: left;
  box-sizing: border-box;
  background: transparent;
  height: calc(100vh - 70px);
  overflow-x: hidden; /*x轴禁止滚动*/
  overflow-y: scroll;/*y轴滚动*/


  /*background-color: #3e3e3e;*/
}

.item {
  padding: 24px 18px;
  overflow: hidden;
  position: relative;
  /* border-bottom: 1px solid #f1f1f1; */
}

.item:last-child::after {
  width: 0px;
}

.item::after {
  content: "";
  display: block;
  position: absolute;
  height: 1px;
  background-color: #f1f1f1;
  bottom: 0;
  left: 0;
  width: 150px;
}

.item .article-title {
  margin-bottom: 15px;
  font-size: 16px;
  display: block;
}

.item .article-title h2 {
  font-weight: normal;
  font-size: 20px;
  display: inline-block;
  position: relative;
}

.item .article-title h2::after {
  content: "";
  display: block;
  position: absolute;
  height: 1px;
  background-color: #555;
  bottom: 0;
  left: 0;
  width: 100%;
  transform-origin: center center;
  transform: scaleX(0);
  transition: 0.3s;
}

.item .article-title:hover h2::after {
  transform: scaleX(1);
}

.item .article-desc {
  line-height: 24px;
  /* text-indent: 24px; */
  color: #777;
}

.item .article-info {
  margin-top: 20px;
  color: #8c8c8c;
  font-size: 12px;
}

.item .article-info i,
.item .article-info strong {
  font-size: 12px;
}

.side {
  width: 250px;
  float: right;
  box-sizing: border-box;
  padding-top: 24px;
}
.tagSide {
  width: 250px;
  box-sizing: border-box;
  padding-top: 24px;
  position: fixed;
  left: 50%;
  margin-left: 200px;
  top: 24px;
}
.hot-title{
  font-size: 16px;
}
.hot-article, .tag-list{
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 6px;
}
.hot-article h3{
  font-weight: normal;
  line-height: 40px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tags{
  margin-top: 24px;
}
.tag-list a{
  display: inline-block;
  padding: 10px;
}
.loadmore{
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  color: #cccccc
}
.smallNav{
  margin-top: 20px;
  width: 100%;
  position: relative;
  color: #797979;
}
.flag{
  width: 35%;
  height: 1px;
  background: #f1f1f1;
  margin-bottom: 20px;
}
.smallNav a{
  padding: 0 5px;
  color: #797979;
}
.fixedTag{
  position: fixed;
  width: 250px;
  top: 60px;
}
</style>
