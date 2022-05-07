<template>
  <div class="emoji-select">
    <el-popover popper-class="popper-height" placement="bottom-start" width="400" trigger="click">
      <div class="emoji-icon-wrap">
        <a class="emoji-icon" href="javaScript:" v-for="(emoji,i) in emojiList" :key="i" @click="getEmoji(i)">{{emoji}}</a>
      </div>
      <div class="icon" slot="reference"></div>
    </el-popover>
  </div>
</template>

<script>
const emojiJson = require("./emoji.json")
export default {
  data(){
    return {
      emojiList: []
    }
  },
  props: ['id','value'],
  mounted(){
    for(let i in emojiJson){
      this.emojiList.push(emojiJson[i].char)
    }
  },
  methods: {
    getEmoji(index){
      let textArea = document.getElementById('textarea'+this.id)
      let changeSelectedText = (obj,str) => {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str);
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length
          textArea.focus()
        } else if (document.selection) {
          // IE浏览器
          obj.focus()
          var sel = document.selection.createRange()
          sel.text = str
        }
      }
      changeSelectedText(textArea,this.emojiList[index])
      this.$emit('input',textArea.value)
      return
    }
  }
}
</script>

<style scoped>
.emoji-icon-wrap{
  padding: 5px 0 5px;
}
.emoji-icon{
  display: inline-block;
  vertical-align: top;
  font-size: 24px;
  padding: 5px;
  margin-bottom: 5px;
}
.icon{
  width: 24px;
  height: 24px;
  padding-left: 46px;
  /*background: url('../../../assets/img/aside-bg.jpg') no-repeat 46px center;*/
  background-size: 24px 24px;
  background-color: #8d77ed;
}
.popper-height{
  height: 190px;
  overflow-y: auto;
}
</style>
