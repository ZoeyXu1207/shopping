<template>
  <div class="goods-detail">
      
    <navigation-bar :isShowBack='isShowBack' :navBarStyle="navBarStyle" @onLeftClick="onBackClick">
        <!--左侧插槽-->
        <template v-slot:nav-left>
            <div class="nav-left">
                <img class="nav-left-img" src="./../../assets/image/back-2.svg"
                :style="{opacity: leftImgOpacity}" />
                <img class="nav-left-img" src="./../../assets/image/back-white.svg"
                :style="{opacity: navBarOpacity}"/>
            </div> 
        </template>
        <!--中间插槽-->
        <template v-slot:nav-center>
            <p class="nav-title" :style="{opacity: navBarOpacity}">商品详情</p>
        </template>
    </navigation-bar>
     
    
    <div class="goods-detail-content">
      <detail-parallax @onScrollChange="onScrollChange">
        <!--缓慢移动区-->
        <template v-slot:parallax-slow>
          <detail-swiper 
          :paginationType='"2"'
          :swiperImgs='goodsData.swiperImgs'>
          </detail-swiper>
        </template>
        <!--正常移动区-->
        <template>
          <detail-content :goodsData='goodsData'></detail-content>
        </template>
      </detail-parallax>
      
      
    </div>
    <detail-buy :goodsData='goodsData'></detail-buy>
  </div>
    
</template>

<script>
import {goods} from '../../api/api'
import NavigationBar from '../home/components/NavigationBar'
import DetailSwiper from '../detail/components/Swiper'
import DetailContent from '../detail/components/Content'
import DetailBuy from '../detail/components/Buy'
import DetailParallax from '../detail/components/Parallax'
export default {
    name: 'Detail',
    data () {
        return {
            //锚点值
            ANCHOP_SCROLL_TOP: 310,
            isShowBack:false,
            goodsData: {
              //swiperImgs: []
            },
            //paginationType: '',
            //navBarStyle: {
                //background: 'pink',
               // position: 'fixed'
            //},
            scrollValue: 0,
        }
    },
    components: {
        NavigationBar,
        DetailSwiper,
        DetailContent,
        DetailBuy,
        DetailParallax,
    },
    created () {
      this.getData()
      //this.goodsData = this.$route.params.goods
      //console.log('商品数据')
      //console.log(this.goodsData)
    },
    
    methods: {
      getData() {
        goods (this.$route.query.goodsId)
        .then((res) => {
            console.log(res)
            this.goodsData = res.data.data.goodsData
            //console.log(this.goodsData)
            
        }).catch((error) => {
            console.log(error)
        })
      },
      //返回按钮
      onBackClick () {
          //console.log('后退执行了')
          this.$router.go(-1)
      },
      onScrollChange (parallaxScroll) {
        //console.log('执行了')
        this.scrollValue = parallaxScroll
        //console.log(this.scrollValue)
      }
    },
    computed: {
      /**
       * 默认状态下左侧后退按钮的透明度
       */
      leftImgOpacity () {
        return 1- this.scrollValue / this.ANCHOP_SCROLL_TOP
      },
      /**
       * navBar 的样式
       */
      navBarStyle () {
        return {
          background: 'rgba(216, 30, 6, ' + this.scrollValue / this.ANCHOP_SCROLL_TOP + ')',
          position: 'fixed',
          top: '0'

        }
      },
      /**
       * navBar 插槽透明度
       */
      navBarOpacity () {
        return this.scrollValue / this.ANCHOP_SCROLL_TOP
      }
    }

}
</script>

<style lang='stylus' scoped>
.goods-detail
  width: 100%
  height: 100%
  display: flex
  flex-flow: column
  position: absolute
  .nav-left
    width: 100%
    display: flex
    position: relative
    .nav-left-img
      align-self: center
      position: absolute
  .nav-title
    width: 100%
    height: 100%
    font-size: .32rem
    font-weight: bold
    text-align: center
    color: white
    
  .goods-detail-content
    height: 100%
</style>