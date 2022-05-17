<template>
  <div class="input-wrap">
    <div class="input">
      <el-avatar size="medium" :src="require('../../../assets/img/aside-bg.jpg')"></el-avatar>
      <el-input :id="'textarea'+id" type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-model.trim="textarea" maxlength="150" show-word-limit></el-input>
    </div>
    <div class="btn-wrap">
<!--      <emoji :id="id" v-model="textarea"></emoji>-->
      <el-button type="primary" size="small" round :disabled="!textarea" @click="reply()" >&nbsp;&nbsp;发表&nbsp;&nbsp;</el-button>
    </div>
  </div>
</template>

<script>
import emoji from './emoji.vue'
import {sendComment} from "@/api";
import {Message} from "element-ui";
export default {
  props: {
    id: {
      type:Number,
    },
    articleId:{
      type:Number,
      required:true
    },
    value:{
      type: String,
    }
  },
  components: {emoji},
  computed: {
    textarea: {
      get(){
        return this.value
      },
      set(newVal){
        this.$emit('input',newVal)
      }
    }
  },
  methods:{
    reply(){
      let data = {
        "article_id" : this.articleId,
        "content" : this.value,
        "id" : this.id
      }
      sendComment(data).then(()=>{
        Message({
          message: "评论成功",
          type: 'success',
          duration: 5 * 1000
        })
        this.$parent.replace()
      })
    }
  }
}
</script>

<style scoped>

  .input{
    display: flex;
    align-items: center;
  }
  span{
    margin-right: 10px;
  }
  .btn-wrap{
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

</style>
