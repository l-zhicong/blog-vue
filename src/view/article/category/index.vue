<template>
  <div class="category-box">
    <a class="item"  @click="getArticleList()">
      全部
    </a>
      <a class="item" v-for="(item,index) in category" @click="getArticleList(item.article_category_id)">
        {{item.title}}
      </a>
  </div>
</template>

<script>
import {Category} from '../data.js'
import {getCategoryList} from "@/api";
export default {
    data(){
      return {
        category:[
          {
            article_category_id:"",
            title:"",
          },
        ]
      }
    },
    mounted() {
      this.init()
    },
    methods: {
        init(){
            getCategoryList().then(res => {
            this.category = res.data.list
          })
          // this.category = Category
        },
      getArticleList(id){
          this.$emit('Event',id)
      }
    }
}
</script>

<style scoped>
.category-box{
  position: relative;
  top: 20px;
  float:left;
  width:20%;
  height: calc(100vh - 70px);
  /*background-color: #2b9aff;*/
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.item {
  padding: 15px 18px;
  overflow: hidden;
  position: relative;
}
</style>
