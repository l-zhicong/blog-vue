<template>
  <div class="about-box">
    <section class="introduce">
      <h1 class="hello">你好，我是</h1>
      <h1 class="name">{{name}}</h1>
      <p class="remarks">{{remarks}}</p>
    </section>

    <section class="about-me">
      <h2>关于我</h2>
      <img class="head-portrait" src="../../assets/img/averter.jpg" alt="">
      <p class="describe" ref="introduce"></p>
    </section>

    <section class="skills">
      <div class="skills-title">
        <h2>技能</h2>
      </div>
      <div class="skills-content">
        <el-row :gutter="20">
          <el-col :span="6"  v-for="(k,v) in skills":key="v">
            <h4>{{k.name}}</h4>
            <el-progress type="circle" :percentage="k.schedule"></el-progress></el-col>
        </el-row>
      </div>
    </section>

    <section class="portfolio">
      <h2>生活照</h2>
      <div class="content">
        <div v-for="item in portfolio" class="page">
          <img class="image" :src= item.url>
          <h1>{{ item.name }}</h1>
        </div>
      </div>
    </section>

    <section class="letter">
      <h2>联系人</h2>
      <h3>给我留个口信</h3>
      <div class="content">
        <el-input placeholder="请输入名字" v-model="msg.name" size="100px" clearable></el-input>
        <el-input placeholder="请输入email" v-model="msg.email" clearable></el-input>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="msg.message"
          maxlength="30"
          show-word-limit
        ></el-input>
        <el-button type="primary" @click="sendOutLetter">发送消息</el-button>
      </div>
    </section>

    <div class="bottom">
      <p>了解更多</p>
      <p>下翻</p>
    </div>

  </div>
</template>
<script>
import lax from 'lax.js'
import {sendOutLetter,GetMyhomepageInfo} from '@/api'
import {Message} from "element-ui";
export default{
  data(){
    return {
      name: "",
      remarks: "",
      introduce:"",
      skills:[],
      portfolio:[
      ],
      msg:{
        name:"",
        email:"",
        message:"",
        captcha:""
      }
    }
  },
  mounted(){
    this.init()
    this.introduceDom()

    this.skillsDom()
    this.portfolioDom()
    this.letterDom()
  },
  methods:{
    init(){
      lax.init()
      lax.addDriver('scrollY', ()=> {
        // console.log(window.scrollY)
        return window.scrollY
      })
      GetMyhomepageInfo().then((res) =>{
        let {data} = res
        this.name = data.name
        this.remarks = data.remarks
        this.introduce = data.introduce
        this.portfolio = data.img
        this.skills = data.skills
        this.aboutMeDom()
      })
    },

    introduceDom(){
      let excessiveH = [0,500,1000]
      lax.addElements('.hello', {

        scrollY: {
          opacity: [excessiveH, [1, 1, 0]],
          translateX: [
            excessiveH,
            [0, '-screenWidth',-1000],
          ],
        }
      })
      lax.addElements('.name', {
        scrollY: {
          translateY: [[-400, 0, 100], [300, 0, 100]],
          scale: [[100, "screenHeight"], [0.25, 10]],
          opacity: [excessiveH, [1, 1, 0]],
        }
      })

      lax.addElements('.remarks', {
        scrollY: {
          opacity: [
            excessiveH,
            [1, 0,0]
          ],
          translateX: [
            excessiveH,
            [0, 'screenWidth',1000],
          ],
        }
      })
    },
    aboutMeDom(){
      let i = 0
      let introduce = this.introduce
      let excessiveH = [500,1000,1500]
      lax.addElements('.about-me', {
        scrollY: {
          opacity: [
            excessiveH,
            [0, 2,0]
          ],
        }
      })
      lax.addElements('.head-portrait',{
        scrollY: {
          rotate: [
            excessiveH,
            [0, 1e9,0]
          ],//旋转
        }
      })
      lax.addElements(".describe", {}, {
        onUpdate: function (driverValues, introduceDom) {
          const scrollY = driverValues.scrollY[0]
          if (scrollY >= excessiveH[0]){
            const oCount = Math.floor(((scrollY-excessiveH[0])*1.3) + 1)
            let introduceArr = introduce.split('');
            const oString = Array.from({ length: oCount }, (v, i) => introduceArr[i]).join("")
            introduceDom.innerHTML = "" + oString
            i += 1
          }
        }
      })
    },
    skillsDom(){
      lax.addElements('.skills',{
        scrollY:{
          opacity: [
            [1250,1750,2250],
            [0, 1,0]
          ],
        }
      })
      lax.addElements('.skills-title',{
        scrollY:{
          scale: [[1250,1750, 2250], [2, 1,10]],
        }
      })
      lax.addElements('.skills-content',{
        scrollY:{
          translateY: [[1250, 1750, 2250], [1250, 0, 100]],
        }
      })

      lax.addElements(".bottom", {
        scrollY: {
          perspective: [[0], [1000]],
          rotateX: [[0,4000], [0,-1000], {inertia: -1}
          ],
        },
      })
    },
    portfolioDom(){
      lax.addElements('.portfolio',{
        scrollY:{
          opacity: [
            [2000,2500,3000],
            [0, 1,0]
          ],
        }
      })
    },
    letterDom(){
      lax.addElements('.letter',{
        scrollY:{
          scale: [[2750, 3300], [0, 1]],
          translateY: [[2750, 3300], ['screenHeight', 0]],
        }
      })
    },


    sendOutLetter(){
      sendOutLetter(this.msg).then(() =>{
        Message({
          message: "发送成功,谢谢支持我会回复您的",
          type: 'success',
          duration: 5 * 1000
        })
      }).catch(

      )
    }
  }
}
</script>
<style scoped>

.introduce{
  background-color: #fff;
  width: auto;
  /*height: 20%;*/
}
.introduce h1 {
  font-family: sans-serif;
  text-align: center;
  top: calc(50% - 20%);
  position: fixed;
  width: 100vw;
  font-size: 70px;
  margin: 0;
  color: #a26ddc;
}
.introduce .hello{
  top: calc(50% - 30%);
}
.introduce .name{
  top: calc(50% - 20%);
}
.introduce .remarks {
  /*font-family: sans-serif;*/
  text-align: center;
  top: calc(50vh - 40px);
  position: fixed;
  width: 100vw;
  font-size: 30px;
  margin: 0;
  color: #a26ddc;
}

.about-me {
  position: fixed;
  color: #a26ddc;
  top: 10px;
  opacity:0;
}
.about-me .head-portrait {
  border-radius: 50%;
}


.skills {
  /*color: #a26ddc;*/
  /*background-color: #fff;*/
  /*display: flex;*/
}

.skills .skills-title {
  background-color: #8d77ed;
  width: 100vw;
  border-radius:30px;
  top: calc(50% - 30%);
}

.skills .skills-content {
  font-family: sans-serif;
  top: 100px;
  width: 100vw;
  color: #a26ddc;
}

.portfolio {
  width: 100%;
  /*background-color: #8d77ed;*/
  /*width: 100vw;*/
  /*border-radius:30px;*/
  /*top: 100px;*/
}

.portfolio .content{
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  color: #8d77ed;
  /*background-color: black;*/
}

.portfolio h1{
  top: 60vh;
  position: absolute;
  width: 100%;
  text-align: center;
  color: #8d77ed;
  font-weight: 800;
  font-size: 60px;
}

.portfolio h2 {
  background-color: #8d77ed;
  width: 50vw;
  margin: 10px auto;
  border-radius:30px;
  top: calc(50% - 30%);
}

.portfolio .image{
  height: calc(100% - 35%);
  width: calc(100% - 20%);
  left: 10%;
  position: absolute;
  transform-origin: center top;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  top: 0vh;
  background-color: #8d77ed;
}

.portfolio .page {
  flex-shrink: 0;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  display: inline-block;
  background-size: cover;
}

.letter {
  background-color: #8d77ed;
  width: 100vw;
  border-radius:30px;
  top: 100px;
}

.letter h2{
  top: 100px;
}

.letter .content {
  margin:auto;
  width: 50%;
}


.about-box{
  height: 5000px;
  width: 100%;
  background-color: #000000;
}

.about-box section {
  position: fixed;
  margin: 0;
  top: calc(50% - 40%);
  left: auto;
  text-align: center;
}

.bottom {
  height: 100px;
  width: 100px;
  background-color: #a26ddc;
  margin-bottom: 0;
  margin-left: -100px;
  margin-top: -100px;
  border-radius: 20px;
  right: 0;
  top: 100vh;
  position: fixed;
  font-size: 20px;
  font-family: sans-serif;
  text-align: center;
  color: #ffffff;
}



</style>
