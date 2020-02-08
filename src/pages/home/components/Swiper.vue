<template>
    <div class="wrapper">
        <swiper :options="swiperOption" v-if="showSwiper">
            <!-- slides -->
            <swiper-slide v-for="item in swiperImgs" :key="item.id">
                <img class="swiper-img" :src="item.icon"/> 
            </swiper-slide>

            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>

        </swiper>
    </div>
</template>

<script>
import {banner} from '../../../api/api'
export default {
    name: 'HomeSwiper',
    data () {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                loop: true,
                //autoplay: 2000
            },
            swiperImgs: []
        }
    },
    computed: {
        showSwiper () {
            return this.swiperImgs.length
        }
    },
    mounted () {
        banner ({

        }).then((res) => {
            console.log(res)
            this.swiperImgs = res.data.data.list
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>

<style lang='stylus' scoped>
.wrapper
  overflow: hidden
  width: 100%
  background: #eee
  .swiper-img
    width: 100%
.wrapper >>> .swiper-pagination-bullet-active
    background: white

</style>