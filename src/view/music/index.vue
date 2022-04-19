<template>
  <div class="music-box">
    <video autoplay loop muted controls>
      <source src="../../assets/mp4/music-bg.mp4" type="video/mp4">
    </video>
    <div id="control">
      <button @click="play" class="playerBTN">
        播放
      </button>
      <button @click="pause" class="playerBTN">
        停止
      </button>
      <input id="musicFile" @change="inputFile($event)" type="file">
    </div>
    <audio id="music" crossorigin="anonymous" :src="url" ref="audio" controls="controls" autoplay="autoplay">
    </audio>
    <div id="music-info">
      <marquee v-if="fileName" hspace="20" behavior="scroll" direction="left">{{ fileName }}</marquee>
      <marquee v-else behavior="alternate">未加载媒体文件</marquee>
    </div>
    <div class="audio-view">
      <canvas class="canvas-left" ref="canvas">您的浏览器不支持canvas标签</canvas>
      <canvas class="canvas-right" ref="canvas">您的浏览器不支持canvas标签</canvas>
      <canvas class="canvas-lower" ref="canvas">您的浏览器不支持canvas标签</canvas>
    </div>
  </div>
</template>

<script>
import music from '@/assets/dj.mp3'
export default {
  data () {
    return {
      music_buffer:[],
      currentTime:0,
      playedTime:0,
      total:0,
      fileName:"",
      url:music
    }
  },
  computed: {
  },
  mounted() {
    this.audioCtx = new AudioContext()  //音频上下文
    this.canvas = this.$refs.canvas
    this.canvasCtx = this.canvas.getContext('2d')

    // this.$refs.audio.src = 'http://127.0.0.1:8888/uploads/local/1.mp3';
    // this.$refs.audio.controls = true;
    // this.$refs.audio.loop = true;
    // this.$refs.audio.autoplay = true;
    // this.$refs.audio.crossOrigin="anonymous";
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

  },
  methods: {
    draw(){
      let analyser = this.analyser
      let canvasCtx = this.canvasCtx
      analyser.fftSize = 2048
      let bufferLength = analyser.frequencyBinCount
      let dataArray = new Uint8Array(bufferLength)
      requestAnimationFrame(this.draw);  //循环
      let barHeight;
      // 自定义获取数组里边数据的频步
      canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        analyser.getByteFrequencyData(dataArray);
        // 绘制线条
        canvasCtx.fillStyle = this.color;
        canvasCtx.fillRect(this.canvas.width / 2 - (i * 2) + this.canvas.width, this.canvas.height, 2, -barHeight/1.5);
      }
    },
    play(){
      // if(this.playedTime>=this.total){
      //   this.playedTime = 0
      // }
      // console.log("222",this.AudioBufferSourceNode)
      // if (this.AudioBufferSourceNode.buffer){
      //   this.AudioBufferSourceNode = this.audioCtx.createBufferSource()
      //   this.AudioBufferSourceNode.buffer = this.music_buffer
      //   this.AudioBufferSourceNode.connect(this.audioCtx.destination)
      //   this.AudioBufferSourceNode.connect(this.analyser)
      //
      //   console.log(this.audioCtx.currentTime)
      //   this.AudioBufferSourceNode.start(0,this.playedTime)
      //   this.startplay = setInterval(()=>{
      //     this.playedTime += 0.1
      //   },100)
      // }else{
      //   this.AudioBufferSourceNode.buffer = this.music_buffer
      //   this.AudioBufferSourceNode.connect(this.audioCtx.destination)
      //   this.AudioBufferSourceNode.connect(this.analyser)
      //   this.AudioBufferSourceNode.loop = true
      //   this.AudioBufferSourceNode.start(0)
      //   this.startplay = setInterval(()=>{
      //     this.playedTime += 0.1
      //   },100)
      //
      // }
      this.audioCtx.resume().then(() => {
        this.$refs.audio.play()
        this.playing = true
        // this.musicDraw.updatePlaying(this.playing)
        // this.musicDraw.animate()
      })
      this.draw()
    },
    pause(){
      this.AudioBufferSourceNode.stop()
    },
    inputFile(e){
      let file = e.target.files[0]
      let fileereader = new FileReader()
      fileereader.readAsArrayBuffer(file)
      fileereader.onload = (event)=>{
        console.log("2",event)
        this.audioCtx.decodeAudioData(event.target.result,(buffer)=>{
          this.music_buffer = buffer
          this.total = this.music_buffer.duration
        })
      }
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
  width:auto;

  margin: 0;
  padding: 0;
  z-index: -99;
  /*-ms-transform: translate(-50%,-50%);*/
  /*transform: translate(-50%,-50%);*/

  /*background: url('') no-repeat;*/
  /*background-size: cover;*/

}

.music-box source{
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}

.audio-view canvas{
  /*background-color: black;*/

  opacity:85%
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


</style>
