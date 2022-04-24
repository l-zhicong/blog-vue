<template>
  <div class="music-box">
    <video autoplay loop muted controls>
      <source src="../../assets/mp4/music-bg.mp4" type="video/mp4">
    </video>
    <audio id="music" crossorigin="anonymous" :src="musicLink" ref="audio" @ended="AutoNext()" :loop=loop autoplay="autoplay">
    </audio>
    <div class="audio-view">
      <!--      两测的画布-->
      <!--      <canvas class="canvas-left" ref="canvas">您的浏览器不支持canvas标签</canvas>-->
      <!--      <canvas class="canvas-right" ref="canvas">您的浏览器不支持canvas标签</canvas>-->
      <canvas class="canvas-lower" ref="canvas">您的浏览器不支持canvas标签</canvas>
    </div>
    <el-button v-if="!drawer" class="openDrawer" @click="drawer = true">
      <i class="iconfont">&#xe65d;</i>
    </el-button>
    <el-drawer class="drawer" :title="nowMusic.name" :visible.sync="drawer" direction="rtl" :before-close="handleClose" >
      <el-slider @change="changeTime" :format-tooltip="formatTime" :max="nowMusic.maxTime" v-model="nowMusic.currentTime">
      </el-slider>
      <el-col :span="6">
      {{formatTime(nowMusic.currentTime)}}/{{formatTime(nowMusic.maxTime)}}
      </el-col>
      <div class="record-img">
          <img ref="recordImg" src="../../assets/img/averter.jpg" alt="">
      </div>
      <div>
        <el-button @click="toUp">
          <i class="iconfont">&#xe7ff;</i>
        </el-button>
        <el-button @click="play">
          <i class="iconfont" v-if=!isPlay>&#xe800;</i>
          <i class="iconfont" v-else>&#xe7fd;</i>
        </el-button>
        <el-button @click="toNext">
          <i class="iconfont">&#xe7fe;</i>
        </el-button>
        <el-button @click="lookup">
          <i class="iconfont" v-if=!loop>&#xe7f3;</i>
          <i class="iconfont" v-else>&#xe501;</i>
        </el-button>
        <el-dropdown>
          <el-button @click="">
            <i class="iconfont">&#xe65d;</i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in musicList":key="index" @click.native="changeMusic(index)">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {getMusicList} from "@/api"
export default {
  data () {
    return {
      drawer: true,
      isPlay:false, //是否在播放
      musicCount:0,
      musicList:[], //播放列表
      musicIndex:0, //第几首
      musicLink:"",
      loop:true,
      nowMusic:{
        name:"未播放音乐",
        posterUrl:"",
        maxTime:0,
        currentTime:0
      },//当前音乐所有信息
    }
  },
  computed: {
  },
  mounted() {
    this.audioCtx = new AudioContext()  //音频上下文
    this.canvas = this.$refs.canvas
    this.canvasCtx = this.canvas.getContext('2d')


    this.AudioBufferSourceNode = this.audioCtx.createMediaElementSource(this.$refs.audio)
    this.analyser = this.audioCtx.createAnalyser()
    this.analyser.connect(this.audioCtx.destination)
    this.AudioBufferSourceNode.connect(this.analyser)

    this.color = this.canvasCtx.createLinearGradient(this.canvas.width / 2, this.canvas.height, this.canvas.width / 2, this.canvas.height / 2 - 150)
    this.color.addColorStop(0, '#1E90FF')
    this.color.addColorStop(.25, '#FF7F50')
    this.color.addColorStop(.5, '#8A2BE2')
    this.color.addColorStop(.75, '#4169E1')
    this.color.addColorStop(1, '#00FFFF')
    getMusicList().then(res => {
      this.musicList = res.data.list
      this.musicCount = res.data.total
    })
    console.log("2222")
    this.$nextTick(()=>{
      setInterval(this.upSliderTime,1000)
    })
  },
  methods: {
    draw(){
      if (!this.$refs.audio.paused){
        requestAnimationFrame(this.draw)  //循环
      }
      let analyser = this.analyser
      let canvasCtx = this.canvasCtx
      analyser.fftSize = 2048
      let bufferLength = analyser.frequencyBinCount
      let dataArray = new Uint8Array(bufferLength)
      let barHeight
      // 自定义获取数组里边数据的频步
      canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]
        analyser.getByteFrequencyData(dataArray)
        // 绘制线条
        canvasCtx.fillStyle = this.color
        canvasCtx.fillRect(this.canvas.width / 2 - (i * 2) + this.canvas.width, this.canvas.height, 2, -barHeight/1.5)
      }
    },
    toNext(){
      this.pause()
      if (this.musicIndex === this.musicCount-1){
        this.musicIndex = 0
      }else{
        this.musicIndex += 1
      }
      this.loadMusic()
    },
    toUp(){
      if(this.musicIndex === 0){
        this.musicIndex = this.musicCount-1
      }else {
        this.musicIndex -= 1
      }
      this.loadMusic()
    },
    play(){
      if (this.isPlay) {
        this.pause()
      } else if (!this.musicLink) {
        this.loadMusic()
      } else {
        this.audioCtx.resume().then(() => {
          this.$refs.audio.play()
          this.isPlay = true
          this.draw()
        })
      }
    },
    loadMusic () {
      let music = this.musicList[this.musicIndex]
      if (this.musicLink === music.url) return
      this.pause()
      this.musicLink = music.url

      this.$refs.audio.onloadedmetadata = () => {
        if(this.$refs.audio.readyState){
          this.nowMusic.maxTime = this.$refs.audio.duration
        }
        this.nowMusic.name = music.name
        this.nowMusic.poster_url = music.poster_url
        this.nowMusic.currentTime = this.$refs.audio.currentTime
        this.play()
      }
    },
    pause(){
      this.audioCtx.resume().then(()=>{
        this.$refs.audio.pause()
        this.draw()
      })
      this.isPlay = false
    },
    changeMusic(index){
      this.pause()
      this.musicLink = this.musicList[index].url
      this.play()
    },
    lookup(){
      if (this.$refs.audio.loop === true){
        this.loop = false
        return
      }
      this.loop = true
    },
    handleClose(done) {
      done();
    },
    AutoNext(){
      if (this.loop === false){
        this.toNext()
      }
    },
    changeTime(time){
      this.$refs.audio.currentTime = time
    },
    upSliderTime(){
      if(this.isPlay){
        if (!this.nowMusic.maxTime){
          this.nowMusic.maxTime = this.$refs.audio.duration
        }
        this.nowMusic.name = this.musicList[this.musicIndex].name
        this.nowMusic.currentTime = this.$refs.audio.currentTime
      }
    },
    formatTime(time){
      let it = parseInt(time)
      let m = parseInt(it/60)
      let s = parseInt(it%60)
      return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
    }
  }

}
</script>

<style scoped>
.music-box {
  width: 100%;
  height: 100%;
  position: relative;
  /*background: #000;*/
}
.music-box video{
  position: fixed;
  right: 0;
  bottom: 0;
  min-height: 100%;
  min-width: 100%;
  height: auto;
  width: auto;

  margin: 0;
  padding: 0;
  z-index: -99;
}

.music-box source{
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}

.audio-view canvas{
  /*background-color: black;*/
  opacity:85%;
}

.canvas-left{
  float: left;
}
.canvas-right{
  float: right;
}

.canvas-lower{
  min-width: 30%;
  min-height: 30%;
  width: 100%;
  height: 30%;
  position: fixed;
  bottom: 0;
  left: 0;
  float: bottom;
}

.drawer{
  opacity: 90%;
  /*position: fixed;*/
  top: 5%;
  width: 100%;
  height: calc(100% - 30%);
  overflow:hidden;
}

.drawer a {
}

.drawer col{
  padding: 9px 0 0 10px;
  color:#909399;
  font-size: 13px
}

.drawer span {
  position:absolute;
  top:0;
  z-index:11;
  background-color: black;
}

.drawer img {
  width: 82%;
  height: 82%;
  border-radius: 50%;
  /*cursor: pointer;*/
  -webkit-animation: play 10s linear infinite;
  -moz-animation: play 10s linear infinite;
  animation: play 10s linear infinite;
}
@-webkit-keyframes play{
  0%{
    -webkit-transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

@-moz-keyframes play {
  0%{
    -moz-transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

@keyframes play{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

.drawer img:hover {
  transform: rotate(360deg);
  box-shadow: 0 0 30px rgba(0, 255, 249, 0.57);
}

.openDrawer {
  float: right;
  opacity: 60%;
}

.record-img {
  /*background:#ff0;*/
  display:inline-block;
  width:100%;
}



</style>
