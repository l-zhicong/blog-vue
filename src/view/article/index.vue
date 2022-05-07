<template>
  <div class="articleBox" ref="articleBox">
    <Category @Event="Test" ref="Category"></Category>
    <section class="article" ref="scrollTopList">
        <a class="item" v-for="(item, index) of article" :key="index" @click="getArticleInfo(item.id)">
          <a href="javascript:void(0)" class="article-title" @click="">
            <h2>{{item.title}}</h2>
          </a>
          <p class="article-desc">{{item.name}}</p>
          <div class="article-info">
            <span class="time">{{item.create_time}}</span>
            <i class="iconfont">&#xe661;</i>
                <span class="time"><strong>{{item.read_num}}</strong>次阅读</span>
            <i class="iconfont">&#xe891;</i>
            <span class="time"><strong>{{item.comment_num}}</strong>条评论</span>
          </div>
        </a>
        <div class="loadmore" v-if="!isLoadingData">没有更多数据了</div>
        <div class="loadmore" v-else>
          <span v-if="isLoadingData">数据加载中...</span>
        </div>
    </section>
<!--    有需求再做固定分页-->
<!--    <el-pagination-->
<!--      background-->
<!--      layout="prev, pager, next"-->
<!--      :total="1000">-->
<!--    </el-pagination>-->
  </div>
</template>
<script>
import {Article} from "./data.js"
import Category from "@/view/article/category";
import {getArticleList} from "@/api";
import * as THREE from 'three'
import Fog from 'vanta/dist/vanta.fog.min'
export default {
  data () {
    return {
      queryParams: {
        page: 1,
        limit: 5,
        cid:"",
      },
      article: [],
      isLoadingData: false, //是否有数据
      // hasMore: true, //是否还有数据
      PageSize: 10, //每页显示
      PageNum: 1, //当前页
      PageTotal: 0, //总条数
      ListIsFinish: false, //是否加载完成
      ListIsLoad: false, //是否加载更多
      deviceTip: "",
    }
  },
  components:{
    Category
  },
  computed: {
  },
  methods: {
    Test(id){
      this.queryParams.page = 1
      this.queryParams.cid = id
      this.getList()
    },
    init(){
      this.getList()
    },
    getList(){
      getArticleList(this.queryParams).then(res => {
        this.isLoadingData = true
        const {data} = res
        this.PageNum = data.page
        this.PageTotal = data.lastPage
        console.log(this.PageTotal,data.page)
        if (data.total <= this.queryParams.limit){
          this.isLoadingData = false
        }
        let arr = []
        if (this.queryParams.page === 1) {
          arr = data.list
        } else {
          arr = this.article.concat(data.list)
        }
        this.article = arr
        this.renderFog()
      }).catch(err => {
        this.isLoadingData = false
        this.renderFog()
      })
    },
    getArticleInfo(id){
      this.$router.push("article/info/"+id)
    },
    handleScroll(){
      let scrollTop = this.$refs.scrollTopList.scrollTop,
        clientHeight = this.$refs.scrollTopList.clientHeight,
        scrollHeight = this.$refs.scrollTopList.scrollHeight,
        height = 0; //根据项目实际定义
      if(scrollTop +clientHeight >= scrollHeight - height){
        if(this.PageTotal === this.PageNum){
          this.isLoadingData = false
          return false
        }else{
          this.queryParams.page += 1
          // this.devicePageSize = this.devicePageSize +10 //显示条数新增
          this.getList() //请求列表list 接口方法
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
    renderFog(){
      let height = this.$refs.scrollTopList.offsetHeight
      let width = this.$refs.scrollTopList.offsetWidth
      this.vantaEffect = Fog({
        el: this.$refs.articleBox,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: height,
        minWidth: width
      })
    }
  },
  mounted () {

    this.init()
    this.$refs.scrollTopList.addEventListener("scroll",this.throttle(this.handleScroll,500),true)
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
}
</script>

<style>
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
  /*background: transparent;*/
  height: calc(100vh - 70px);
  overflow-x: hidden; /*x轴禁止滚动*/
  overflow-y: scroll;/*y轴滚动*/
  /*background-image: url("../../assets/img/aside-bg.jpg");*/

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
.hot-article h3{
  font-weight: normal;
  line-height: 40px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
.smallNav a{
  padding: 0 5px;
  color: #797979;
}
</style>
