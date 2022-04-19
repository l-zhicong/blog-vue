<template>
  <div>
    <div class="intro">
    <div>
<!--          <audio id="bgmusic" src="" controls="controls" autoplay="autoplay"></audio>-->
          <h1>你好，我是<span class="name">{{name}}</span></h1>
          <p>{{remarks}}</p>
          <a href="#about" class="btn-default">了解更多</a>
    </div>
  </div>

    <section id="nav">
      <div class="navbar navbar-custom">
        <div class="container">
          <div class="navbar-header">
<!--            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse"> <i class="fa fa-bars"></i> </button>-->
            <a class="navbar-brand page-scroll" href="#page-top">{{name}}</a>
          </div>
          <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
            <ul class="nav navbar-nav">
              <li class="hidden"> <a href="#page-top"></a> </li>
              <li> <a class="page-scroll" href="#about">关于</a> </li>
              <li> <a class="page-scroll" href="#skills">技能</a> </li>
              <li> <a class="page-scroll" href="#portfolio">照片</a> </li>
              <li> <a class="page-scroll" href="#resume">简历</a> </li>
              <li> <a class="page-scroll" href="#contact">联系人</a> </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <div id="about">
    <div class="container">
      <h2>关于我</h2>
      <div class="head-portrait">
        <a>
          <img src="../../assets/img/averter.jpg" alt="">
        </a>
      </div>

        <div class="col-md-8 col-md-offset-2">
          <div class="about-text">
            <p v-for="(item,i) in introduce":key="i">{{item}}</p>
            <p class="text-center"><a class="btn btn-primary" href="#"><i class="fa fa-download"></i> 下载简历</a></p>
          </div>
      </div>
    </div>
    </div>

    <div id="skills" class="text-center">
      <div class="container">
        <div class="section-title center">
          <h2>技能</h2>
          <hr>
        </div>
        <el-row :gutter="20">
          <el-col :span="6"  v-for="(k,v) in skills":key="v">
            <h4>{{k.name}}</h4>
            <el-progress type="circle" :percentage="90">22</el-progress></el-col>
        </el-row>
      </div>
    </div>

    <div id="portfolio">
      <div class="container">
        <div class="section-title text-center center">
          <h2>生活照</h2>
          <hr>
        </div>
      </div>
    </div>

    <div id="achievements" class="text-center">
      <div class="container">
        <div class="section-title center">
          <h2>一些数据</h2>
          <hr>
        </div>
        <el-row :gutter="20">
          <el-col :span="6">
            <span class="count">工作时间</span>
            <h4>{{workinghours}}</h4>
          </el-col>
          <el-col :span="6">
            <span class="count">获奖</span>
            <h4>{{award}}</h4>
          </el-col>
          <el-col :span="6">
            <span class="count">经验</span>
            <h4>{{experience}}</h4>
          </el-col>
        </el-row>
      </div>
    </div>

    <div id="contact" class="text-center">
      <div class="container">
        <div class="section-title center">
          <h2>联系人</h2>
        </div>
        <h3>给我留个口信</h3>
        <div>
          <el-input placeholder="请输入内容" v-model="msg.name" clearable></el-input>
          <el-input placeholder="请输入内容" v-model="msg.email" clearable></el-input>
          <el-input placeholder="请输入内容" v-model="msg.message" clearable></el-input>
          <el-input placeholder="请输入内容" v-model="msg.captcha" clearable></el-input>
          <el-button type="primary" @click="">发送消息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      music: "/music/蓝心羽 - 还是会想你 (Live).mp3",
      name: "梁智聪",
      remarks: "后端开发者，数据库以及服务器管理者",
      introduce:[
        "1、两年工作经验 精通php+Mysql 网站开发、熟练使用php主流框架，精通mysql数据库常用操作；\n" +
        "              2、熟练开发高性能API接口，熟悉缓存技术以及Linux操作系统常用命令；\n" +
        "              3、掌握HTML、CSS3，js等技能，可独立开发微信项目；\n" +
        "              熟练php多进程编程 mysql,索引优化，php socket，linux,composer,npm,swoole，websocket的使用\n" +
        "              熟练使用swoft框架,tp5框架\n" +
        "              微信小程序，微信支付宝支付等第三方接口\n" +
        "              Lamp、Lnmp环境下开发\n" +
        "              熟练使用redis\n" +
        "              熟练数据结构、算法\n" +
        "              熟练docker、golang并发编程、elasticsearch全文搜索",
        "Web开发：PHP/ Python\n" +
        "              Web框架：ThinkPHP/Lavarel/ Dedecms / Ecshop/ PHPmywind\n" +
        "              前端框架：Bootstrap/ AngularJS/ Vuede.js/React/Layui/uni-app\n" +
        "              版本管理、文档和自动化部署工具：Svn/ Git/ PHPDoc\n" +
        "              单元测试：PHPUnit/ SimpleTest\n" +
        "              云和开放平台：微博开放平台/ 微信公众号开发/ 微信小程序开发/短信接口/支付宝支付\n" +
        "              操作系统：基于linux/ mac/ 开发 "
      ],
      skills:[
        {
          name:"HTML5",
          schedule:80
        },
        {
          name:"php",
          schedule:80
        },
        {
          name:"golang",
          schedule:80
        },
        {
          name:"golang",
          schedule:80
        },
        {
          name:"golang",
          schedule:80
        },
        {
          name:"golang",
          schedule:80
        }
      ],
      workinghours:240,
      award:1,
      experience:"2年内",
      msg:{
        name:"",
        email:"",
        message:"",
        captcha:""
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: 700;
}
h2 {
  font-size: 30px;
  text-align: center;
}
hr {
  background: rgba(255,255,255,0.3);
  height: 4px;
  width: 70px;
  text-align: center;
  position: relative;
  border: 0;
  box-sizing: content-box;
}
.row {
  margin-right: -15px;
  margin-left: -15px;
}
.btn-default {
  color: #fff;
  background-color: transparent;
  border-color: #fff;
  padding: 10px 20px;
  margin: 0;
  font-size: 16px;
  border-radius: 0;
}
.btn-default:hover, .btn-default:focus, .btn-default:active {
  color: #fff;
  background-color: #121d1f;
  border-color: #121d1f;
}
.intro {
  display: table;
  width: 100%;
  height: auto;
  padding: 100px 0;
  text-align: center;
  color: #fff;
  background: url("../../assets/img/intro-bg.jpg")no-repeat center top;
  background-size: cover;
}
.intro H1 {
  font-size: 60px;
  font-weight: 500;
  letter-spacing: -2px;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

#nav {
  z-index: 9999;
}

.navbar {
  position: relative;
  min-height: 50px;
  margin-bottom: 20px;
  border: 1px solid transparent;
}
.navbar-custom {
  margin-bottom: 0;
  background-color: #121d1f;
  border-radius: 0px;
  padding: 10px 0;
}

@media (min-width: 768px)
{
  .container > .navbar-header{
    margin-right: 0;
    margin-left: 0;
  }
}
.navbar-header {
  float: left;
}
/*@media (min-width: 768px){*/
/*  .navbar > .container .navbar-brand {*/
/*    margin-left: -15px;*/
/*  }*/
/*}*/


.navbar-custom .navbar-brand {
  font-weight: 600;
}
.navbar-custom a {
  color: #f4f5f6;
}

.navbar-brand {
  float: left;
  height: 50px;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 5px;
}

.navbar-right{
  float: right;
}
.navbar-collapse {
  padding-right: 15px;
  padding-left: 15px;
}
.collapse {
  margin-right: 0;
  margin-left: 0;
}

@media (min-width: 768px) {
  .navbar-collapse.collapse {
    display: block !important;
    height: auto !important;
    padding-bottom: 0;
    overflow: visible !important;
  }
}

@media (min-width: 768px) {
  .navbar-collapse {
    width: auto;
    border-top: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}

.navbar-nav {
  float: left;
  margin: 0;
  padding-left: 0;
}

.navbar-nav ul li {
  list-style-type:none;
  /*list-style: none;*/
  padding: 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.navbar-nav > li {
   float: left;
}
.nav > li {
  position: relative;
  display: block;
}
.hidden {
  display: none !important;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
.navbar-custom .nav li a {
  text-transform: uppercase;
  letter-spacing: 1px;
  /*-webkit-transition: background .3s ease-in-out;*/
  /*-moz-transition: background .3s ease-in-out;*/
  transition: background .3s ease-in-out;
  line-height: 5px;
}

.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}

@media (min-width: 768px) {
  .navbar-nav > li > a {
    padding-top: 15px;
    padding-bottom: 15px;
  }
}

#about {
  padding: 100px 0;
  background: #f6f6f6;
}

.head-portrait{
  margin: 0 auto;
  text-align: center
}

#about img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: transform 0.5s;
  cursor: pointer;
}

#about img:hover {
  transform: rotate(360deg);
  box-shadow: 0 0 30px rgba(0, 255, 249, 0.57);
}
#about .about-text {
  margin-left: 10px;
}
#about p {
  margin-top: 20px;
  margin-bottom: 30px;

}

#skills {
  padding: 100px 0;
  background: #7bc3d1;
}
.text-center {
  text-align: center;
}
#skills .section-title {
  padding: 25px 0 45px 0;
}
#skills h2 {
  color: #fff;
}


#achievements {
  padding: 100px 0;
  background: #7bc3d1;
}

.section-title.center {
  padding: 25px 0 45px 0;
}

#contact {
  padding: 100px 0 40px 0;
  color: #121d1f;
  background: #fff;
}

#contact h2 {
  color: #000000;
}


</style>
