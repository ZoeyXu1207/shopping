<template>
    <div class="wrapper">
        <swiper :options="swiperOption" v-if="showSwiper">
            <!-- slides -->
            <swiper-slide v-for="item in swiperImgs" :key="item.id">
                <img class="swiper-img" :src="item"/> 
            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>

        </swiper>
    </div>
</template>

<script>
import {banner} from '../../../api/api'
export default {
    name: 'DetailSwiper',
    data () {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                loop: true,
                autoHeight: true,
                //observer:true,
                //observeParents:true,
                //autoplay: 2000
            },
            //swiperImgs: []
        }
    },
    props: {
        swiperImgs:{
            type: Array,
            default () {
                return []
            }
        },
        /**
         * 1. 原点切换
         * 2. 数字
         */
        paginationType: {
            type: String,
            default: '1'
        }
    },
    methods: {
        /**
         * 根据分页器类型配置对应的分页器
         */
        initPaginationLayout () {
            switch(this.paginationType) {
                //圆点分页器
                case '1':
                    this.swiperOption.pagination = {
                        //分页器对应的HTML元素
                        el: '.swiper-pagination',
                        //分页器的样式
                        type: 'bullets',
                        //分页器内的元素，添加类名
                        bulletClass: 'custom-bullet-class'
                    }
                    break
                //数字分页器
                case '2':
                    this.swiperOption.pagination = {
                        el: '.swiper-pagination',
                        //分页器样式（数字）
                        type: 'fraction'
                    }
                    break
            }
        }
    },
    computed: {
        showSwiper () {
            return this.swiperImgs.length
        }
    },
    created () {
        //console.log('执行了')
        //console.log(this.swiperImgs),
        this.initPaginationLayout()
    }

    //mounted () {
        //banner ({

        //}).then((res) => {
            //console.log(res)
            //this.swiperImgs = res.data.data.list
        //}).catch((error) => {
            //console.log(error)
        //})
    //},
}
</script>

<style lang='stylus'>
.wrapper
  overflow: hidden
  width: 100%
  background: #eee
  .swiper-img
    width: 100%
  .swiper-pagination
    bottom: .22rem
    width: 100%
    height: 30px
    background: pink
    .custom-bullet-class
      box-sizing: border-box;
      border-radius: 100%;
      height: .16rem;
      width: .16rem;
      border: .02667rem solid #fff;
      margin: 0 .10667rem;
      display: inline-block;
      opacity: 1;
  .swiper-pagination-fraction
    left: auto
    right: 0
    width: auto
    font-size: .28rem
    background: rgba(0,0,0,.3)
    padding: .12rem .36rem
    border-top-left-radius: .32rem
    border-bottom-left-radius: .32rem
    bottom: .64rem
    color: white
    .swiper-pagination-current
      font-size: .32rem;
      font-weight: bold;
      

.wrapper >>> .swiper-pagination-bullet-active
    background: blue

</style>