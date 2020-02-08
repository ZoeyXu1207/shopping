<template>
<!--
  能力：
       1. 默认的展示效果 -> 左边后退按钮的图标，中间页面的名称，右边是空白的内容
       2. 可通过插槽来配置具体的展示样式 -> 左，中，右 三个插槽，父组件可以通过三个插槽来制定对应位置的布局
       3. 可以接收从外部指定的一个样式（可以在父组件中指定 navigationBar 的 style）
-->
    <div class="nav-bar" :class="{'bottom-line':pageName}" 
      :style='navBarStyle'>
        <div class="left" @click="$emit('onLeftClick')">
            <!--默认状态-->
            <img class="img" v-if="isShowBack" src="@/assets/image/back.svg" />
            <!--具名插槽-->
            <slot name="nav-left"></slot>
        </div>
        <div class="center">
            <!--默认状态-->
            <span class="page-title">{{pageName}}</span>
            <!--具名插槽-->
            <slot name="nav-center"></slot>
        </div>
        <!--默认状态-->
        <div class='right'>
          <!--具名插槽-->
          <slot name="nav-right"></slot>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'NavigationBar',
    props: {
        pageName: {
            type: String,
            default: ''
        },
        isShowBack: {
            type: Boolean,
            default: true
        },
        /* navBar样式 */
        navBarStyle: {
          type: Object,
          default () {
            return {
              background: 'white',
            }
          }
        }
    }
}
</script>

<style lang='stylus' scoped>
.bottom-line
  border-bottom: .02rem solid #e5e5e5
.nav-bar
  width: 100%
  height: .88rem
  line-height: .88rem
  display: flex
  justify-content: space-between
  z-index: 999
  .left
    display: flex
    height: 100%
    width: .52rem
    padding: 0 .16rem
    .img
      width: 100%
      align-self: center
  .right
    display: flex
    height: 100%
    width: .52rem
    padding: 0 .16rem
    .img
      width: 100%
      align-self: center
  .center
    display: flex
    height: 100%
    flex-grow: 1
    .page-title
      align-self: center
      margin: 0 auto 
      font-size: .32rem
</style>