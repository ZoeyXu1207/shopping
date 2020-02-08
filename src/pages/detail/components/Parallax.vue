<template>
  <!--
      视差效果： 让多层背景以不同的速度去进行移动
      1. 至少需要拥有两层背景（缓慢移动区，正常移动区）
      2. 将背景设置为相对布局（为缓慢移动区设置top，来缓冲掉scroll的滚动）
      3. 监听Parallax组件的滑动，根据滑动来计算缓慢移动区top的值
  -->
    <div class="parallax" @scroll="onScrollChange">
        <!--缓慢移动区-->
        <div class="parallax-slow" :style='{top: slowTop}'>
            <slot name='parallax-slow'></slot>
        </div>
        <!--正常移动区-->
        <div class="parallax-normal"> 
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailParallax',
    data () {
        return {
            //速度差
            SPEED_DIFF: 2,
            //页面滑动值
            parallaxScroll: 0,
        }
    },
    methods: {
        onScrollChange () {
            //console.log('执行了')
            this.parallaxScroll = document.documentElement.scrollTop || document.body.scrollTop
            this.$emit('onScrollChange',this.parallaxScroll)
            //console.log(this.parallaxScroll)
        }
    },
    computed: {
        /**
         * 返回slow距离顶部的距离
         */
        slowTop () {
            //当前页面的滑动距离 / 速度差 = 缓慢移动区应该移动的距离
            //当前页面的滑动距离 - 缓慢移动区应该移动的距离 = 缓慢移动区用来缓冲掉scroll的距离
            return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px'
        }
    },
    mounted () {
        window.addEventListener('scroll', this.onScrollChange)
    },
    unmounted () {
        window.removeEventListener('scroll', this.onScrollChange)
    }
}
</script>

<style lang='stylus' scoped>
.parallax
  width: 100%
  height: 100%
  overflow: hidden
  overflow-y: auto
  .parallax-slow
    width: 100%
    position: relative
  .parallax-normal
    width: 100%
    position: relative
    z-index: 2

</style>