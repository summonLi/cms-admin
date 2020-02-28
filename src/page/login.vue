<template>
  <div class="loginBox">
    <div class="login-form-box">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <h3>系统登录</h3>
        <el-form-item prop="userNum">
          <el-input type="text" v-model="loginForm.userNum" placeholder="请输入账号" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.pwd" placeholder="请输入密码" autocomplete="on"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" :loading="loading" @click.native.prevent="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import { getStorge } from '@/utils/auth'
    export default {
      name: "login",
      data(){
          return {
            loginForm: {
              userNum:'',
              pwd:''
            },
            loginRules: {
              userNum: [
                { required: true, message:'请输入账号', trigger:'blur'}
              ],
              pwd: [
                { required: true, message: '请输入密码', trigger:'blur'}
              ]
            },
            loading:false,
            checked:false,
          }
      },
      created(){

      },
      methods: {
        handleLogin(){
          this.$refs['loginForm'].validate((valid)=> {
            if(valid) {
              this.loading = true
              this.$store.dispatch('Login',this.loginForm).then(() => {
                this.loading = false
                this.$router.push({ path:'/'})
              }).catch(() => {
                this.loading = false
              })
            }else {
              return false
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  @import "../styles/them.scss";
  .loginBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: $globalBgColor;
    .login-form-box {
      width: 350px;
      background: #fff;
      margin: 200px auto;
      padding: 20px 35px;
      border-radius: 5px;
      box-shadow: 0 0 15px #cac6c6;
      .remember {
        margin-bottom: 22px;
      }
    }
  }
</style>
