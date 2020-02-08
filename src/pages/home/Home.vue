<template>
    <div class="wrap" ref="home" @onScrollChange='onScrollChange'>
        <navigation-bar :isShowBack='isShowBack' :navBarStyle='navBarStyle'>
            <!--左侧插槽-->
            <template v-slot:nav-left>
                <img :src="navBarCurretnSlotStyle.leftIcon"/>
            </template>
            <!--中间插槽-->
            <template v-slot:nav-center>
                <home-search :bgcolor="navBarCurretnSlotStyle.search.bgcolor"
                  :icon="navBarCurretnSlotStyle.search.icon" 
                  :hintcolor="navBarCurretnSlotStyle.search.hintcolor">

                </home-search>
            </template>
            <!--右侧插槽-->
            <template v-slot:nav-right>
                <img :src="navBarCurretnSlotStyle.rightIcon"/>
            </template>
        </navigation-bar>
        <home-footer></home-footer>
        <home-swiper></home-swiper>
        <home-activity></home-activity>
        <home-option></home-option>
        <home-seconds></home-seconds>
        <home-shop></home-shop>
        <home-waterfall></home-waterfall>
    </div>  
</template>

<script>

import HomeFooter from './components/Footer'
import HomeSwiper from './components/Swiper'
import HomeActivity from './components/Activity'
import HomeOption from './components/Option'
import HomeSeconds from './components/Seconds'
import HomeShop from './components/Shop'
import HomeWaterfall from './components/Waterfall'
import NavigationBar from './components/NavigationBar'
import HomeSearch from './components/Search'
//import swiper1 from './../../assets/image/swiper-1.jpg'
//import swiper2 from './../../assets/image/swiper-2.jpg'
//import swiper3 from './../../assets/image/swiper-3.jpg'
//import swiper4 from './../../assets/image/swiper-4.jpg'
//import swiper5 from './../../assets/image/swiper-5.jpg'
//import swiper6 from './../../assets/image/swiper-6.jpg'
//import swiper7 from './../../assets/image/swiper-7.jpg'
//import swiper8 from './../../assets/image/swiper-8.jpg'
import search from './../../assets/image/search.svg'
import morewhite from './../../assets/image/more-white.svg'
import messagewhite from './../../assets/image/message-white.svg'
import more from './../../assets/image/more.svg'
import searchwhite from './../../assets/image/search-white.svg'
import message from './../../assets/image/message.svg'
export default {
    name: 'Home',
    data () {
        return {
            pageName: '首页',
            isShowBack: false,
            bgcolor: '#ffffff',
            hintcolor: '#999999',
            icon: search,
            top: 0,

            navBarSlotStyle: {
                //默认样式
                normal: {
                    //左侧插槽
                    leftIcon: morewhite,
                    //中间插槽
                    search: {
                        bgcolor: '#ffffff',
                        hintcolor: '#999999',
                        icon: search,
                    },
                    //右侧插槽
                    rightIcon: messagewhite,

                },
                 //高亮样式
                highlight: {
                    //左侧插槽
                    leftIcon: more,
                    //中间插槽
                    search: {
                        bgcolor: '#d7d7d7',
                        hintcolor: '#ffffff',
                        icon: searchwhite,
                    },
                    //右侧插槽
                    rightIcon: message,

                }
            },
            //navBar当前使用的插槽样式
            navBarCurretnSlotStyle: {},
            //navBar的定制样式
            navBarStyle: {
                position: 'fixed',
                background: '',
            },

            //锚点值
            ANCHOR_SCROLL_TOP: 200,


          //swiperImgs:[
              //swiper1,
              //swiper2,
              //swiper3,
              //swiper4,
              //swiper5,
              //swiper6,
              //swiper7,
              //swiper8
          //]
        }
    },
    created () {
        this.navBarCurretnSlotStyle = this.navBarSlotStyle.normal
    },
    components: {
        HomeFooter,
        HomeSwiper,
        HomeActivity,
        HomeOption,
        HomeSeconds,
        HomeShop,
        HomeWaterfall,
        NavigationBar,
        HomeSearch,
    },
    methods: {
        onScrollChange () {
            
            this.top = document.documentElement.scrollTop || document.body.scrollTop
            let opacity = this.top / this.ANCHOR_SCROLL_TOP
            //console.log(top)
            
            //指定narBar插槽样式
            if (this.top >= 200) {
                this.navBarCurretnSlotStyle = this.navBarSlotStyle.highlight
            } else {
                this.navBarCurretnSlotStyle = this.navBarSlotStyle.normal
            }
            this.navBarStyle.background = 'rgba(255,255,255, '+ opacity +')'
        }
    },
    activated () {
        this.$refs.home.scrollTop = this.top
    },
    mounted () {
        window.addEventListener('scroll', this.onScrollChange)
    },
    destroyed () {
        window.removeEventListener('scroll', this.onScrollChange)
    }

}
</script>

<style lang='stylus' scoped>
  .wrap
    width: 100%
    height: auto
    display: flex
    flex-flow: column
    position: absolute
      
    
</style>