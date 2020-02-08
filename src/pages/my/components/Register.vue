<template>
    <div class="register">
        <navigation-bar :pageName='pageName' @onLeftClick='onBackClick'></navigation-bar>
        <!--内容区-->
        <div class="register-content">
            <!--用户名-->
            <div class="input-container">
                <input class="input-container-input" v-model="username" type="text" placeholder="用户名">
            </div>
            <!--密码-->
            <div class="input-container">
                <input class="input-container-input" v-model="password" type="text" placeholder="密码">
            </div>
            <!--确认密码-->
            <div class="input-container">
                <input class="input-container-input" v-model="confirmPassword" type="text" placeholder="确认密码">
            </div>
            <!--注册-->
            <div class="input-container-register" @click="onRegisterClick">注册</div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '../../home/components/NavigationBar'
export default {
    name: 'Register',
    data () {
        return {
            pageName: '注册',
            username: '',
            password: '',
            confirmPassword: ''
        }
    },
    components: {
        NavigationBar,
    },
    methods: {
        onBackClick() {
            this.$router.go(-1)
        },
        onRegisterClick() {
            if(this.username.length === 0) {
                alert('请完善用户名')
                return
            }
            if(this.password.length === 0 || this.password.length != this.confirmPassword.length) {
                alert('请完善密码')
                return
            } else {
                alert('注册成功')
                return
            }
        }
    }
}
</script>

<style lang='stylus' scoped>
.register
  height: 100%
  width: 100%
  background: white
  overflow: hidden
  .register-content
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
    .input-container-register
      margin-top: 40%
      background: #d81e06
      height: .76rem
      line-height: .76rem
      border-radius: .3rem
      text-align: center
      color: white
</style>