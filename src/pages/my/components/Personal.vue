<template>
    <div class="personal">
        <div class="personal-desc" @click="onLogin">
            <img class="personal-desc-img" src="../../../assets/image/avater.png"/>
            <p class="personal-desc-login">登录/注册</p>
        </div>
        <div class="personal-tools">
            <div class="personal-tools-item" v-for="(item, index) in toolsDatas" :key="index">
                <p class="personal-tools-item-name">{{item}}</p>
                <img class="personal-tools-item-img" src="../../../assets/image/right-arrow.svg"/>
            </div>
        </div>
        <div class="personal-logout">退出登录</div>
    </div>
</template>

<script>
//import avater from '../../../assets/image/avater.png'
export default {
    name: 'MyPersonal',
    data () {
        return {
            toolsDatas: [
                '全部订单',
                '我的预约',
                '应用推荐',
                '用户福利',
            ]
        }
    },
    methods: {
        onLogin() {
            this.$router.push({
                name: 'Login',
                params: {
                    routerType: 'push',
                }
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
.personal
  height: 100%
  width: 100%
  .personal-desc
    margin-top: .16rem
    background: white
    height: 1.36rem
    display: flex
    align-items: center
    border-top: .02rem solid #e5e5e5
    border-bottom: .02rem solid #e5e5e5
    padding: .16rem
    .personal-desc-img
      width: 1.04rem
      height: 1.04rem
    .personal-desc-login
      margin-left: .16rem
      font-size: .32rem
  .personal-tools
    .personal-tools-item
      display: flex
      height: .92rem
      box-sizing: border-box
      align-items: center
      padding: .16rem
      background: white
      border-bottom: .02rem solid #e5e5e5
      .personal-tools-item-name
        font-size: .28rem
        flex-grow: 1
      .personal-tools-item-img
        width: .32rem
  .personal-logout
    margin-top: 20%
    background: #d81e06
    height: .76rem
    line-height: .76rem
    border-radius: .3rem
    text-align: center
    color: white

    
</style>