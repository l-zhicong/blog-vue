<template>
  <el-row justify="center">
    <el-dialog
      title="登录"
      :visible.sync="LoginDialog"
      persistent
      max-width="600px"
      :before-close="showLogin"
    >
      <el-row>
        <el-col cols="12">
          <el-input v-model="loginForm.username" placeholder="账号"></el-input>
        </el-col>
        <el-col cols="12">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            required
          ></el-input>
        </el-col>
        <el-col cols="12">
          <el-button @click="showLogin">取 消</el-button>
          <el-button type="primary" @click="login">登 录</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>

export default {
  data: () => ({
    loginForm: {
      username: '',
      password: '',
      openid:''
    },
  }),
  computed: {
    LoginDialog:{
      get() {
        return this.$store.getters.loginDialog
      }
    },
  },
  methods: {
    showLogin(){
      this.$store.dispatch("user/showLogin")
    },
    async login() {
        this.$store.dispatch('user/login', this.loginForm).then(res => {
          this.$store.dispatch("user/showLogin")
        })
    },
  },
};
</script>
