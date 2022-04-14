<template>
  <div class="category-box">
      <div class="item" v-for="(item,index) in category">
        {{item.title}}
      </div>
  </div>
</template>

<script>
import {Category} from '../data.js'
export default {
    data(){
      return {
        category:[
          {
            id:"",
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
          this.category = Category
        }
    }
}
</script>

<style scoped>
.category-box{
  float:left;
  width:20%;
  height: calc(100vh - 70px);
  /*background-color: #2b9aff;*/
  overflow: scroll;
}
.item {
  padding: 20px 18px;
  overflow: hidden;
  position: relative;
  /* border-bottom: 1px solid #f1f1f1; */
}
</style>
