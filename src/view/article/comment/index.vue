<template>
  <div class="comment-list">
    <div v-for="item in list" :key="item.id">
      <div class="cont-wrap">
        <el-avatar size="medium" :src="require('../../../assets/img/aside-bg.jpg')"></el-avatar>
        <div class="right-cont">
          <span class="user-name">{{item.user_name}}</span>
          <span class="cont">{{item.content}}</span>
          <div class="bottom-wrap">
            <span class="time">{{item.create_time}}</span>
            <div>
              <el-button type="text" icon="el-icon-chat-dot-round" style="color:#222;" @click="replyHandle(item)">{{item.showReply&&curIndex==item.id?'取消回复':'回复'}}</el-button>
              <el-button type="text" icon="el-icon-thumb" style="color:#222;width:60px;">{{item.support}}</el-button>
            </div>
          </div>
          <div v-show="item.showReply&&curIndex==item.id">
            <reply-input :id="item.id" v-model="item.reply"></reply-input>
          </div>
        </div>
      </div>
      <div class="item-children" v-if="item.list&&item.list.length">
        <reply-list :curIndex="curIndex" :list="item.list" @change="change"></reply-list>
      </div>
    </div>
  </div>
</template>

<script>
import replyInput from './reply.vue'
export default {
  name: 'ReplyList',
  props: {
    curIndex: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  components: {replyInput},
  methods: {
    replyHandle(obj){
      this.$emit('change',obj)
    },
    change(obj){
      this.$emit('change',obj)
    }
  }
}
</script>

<style scoped>
.cont-wrap{
  display: flex;
}
.cont-wrap span {
  margin-right: 10px;
}
.right-cont {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.bottom-wrap{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-name{
  font-size: 15px;
  color: #222;
}
.cont{
  font-size: 13px;
  line-height: 22px;
  color: #222;
}
.time{
  font-size: 13px;
  color: #9195a3;
}
.item-children{
  padding: 0 0 0 46px;
}
</style>
