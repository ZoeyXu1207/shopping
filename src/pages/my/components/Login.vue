<template>
    <div class="login">
        <navigation-bar :pageName='pageName' @onLeftClick='onBackClick'></navigation-bar>
        <!--内容区-->
        <div class="login-content">
            <!--用户名-->
            <div class="input-container">
                <input class="input-container-input" v-model="username" type="text" placeholder="用户名">
            </div>
            <!--密码-->
            <div class="input-container">
                <input class="input-container-input" v-model="password" type="text" placeholder="密码">
            </div>
            <!--登录-->
            <div class="login-content-login" @click="onLoginClick">登录</div>
            <a class="login-content-register" @click="onToRegister">注册新用户</a>
        </div>
    </div>
</template>

<script>
import NavigationBar from '../../home/components/NavigationBar'
export default {
    name: 'Login',
    data () {
        return {
            pageName: '登录',
            username: '',
            password: '',
        }
    },
    components: {
        NavigationBar,
    },
    methods: {
        onBackClick () {
            this.$router.go(-1)
        },
        onLoginClick () {
            if (this.username.length === 0 || 
            this.password.length === 0) {
                alert('用户名或密码未输入')
                return
            }
            //与原生交互，验证用户输入的用户名和密码
        },
        onToRegister () {
            this.$router.push({
                name: 'Register',
                params: {
                    routerType: 'push',
                }
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
.login
  height: 100%
  width: 100%
  background: white
  .login-content
    width: 100%
    height: 100%
    .input-container
      height: .82rem
      padding: .16rem
      overflow: hidden
      margin-top: .09rem
      background: white
      border-bottom: .02rem solid #e5e5e5
      box-sizing: border-box
      .input-container-input
        width: 100%
        height: 100%
        font-size: .32rem
        outline: none 
        border: none
    .login-content-login
      margin-top: 40%
      background: #d81e06
      height: .76rem
      line-height: .76rem
      border-radius: .3rem
      text-align: center
      color: white
    .login-content-register
      font-size: .28rem
      color: rgba(0,0,0,.5)
      margin-top: .16rem
      padding: .16rem
      float: right
</style>