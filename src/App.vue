<template>
  <div id="app">
    <!--
      页面过渡效果实现逻辑：
      1. 创建动画的CSS
      2. 判断当前是需要执行 跳转动画 （进入新页面），
         还是后退动画 （后退页面）
         1. 监听路由对象$route
         2. 让页面在跳转的时候，携带包含跳转标记的params，
            通过对parans中跳转标记的判断，来判断当前是否为跳转动画
         3. 如果说 params 包含跳转标记，那么表示当前为
            跳转动画， 否则当前为后退动画
      3. 通过transition的方式为router-view指定对应的动画效果
      4. 父组件页面要通过设置position为absolute来脱离标准文档流，这样页面滑动时不会有空白部分
    -->

    <!--
      页面跳转的滑动状态保存：
      1. 所有的组件中数据都会被保存下来
      2. 需要在组件中创建一个变量（会被keep-alive保存起来），通过
         这个变量来记录当前页面的一个滑动距离
      3. 当后退回该页面的时候，使用这个变量来改变当前页面的一个滑动距离
         1. 应该在什么时机去改变当前页面的滑动距离
         2. 可以在组件的 activated（keep-alive组件被激活的时候才会使用） 
            方法中去指定页面滑动模块的滑动距离
    -->
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <router-view/>
      </keep-alive>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'fold-left',
      //虚拟任务栈
      virtualTaskStack: [
        'Home',
      ]
      
    }
  },
  watch: {
    //vue监听路由对象，决定使用哪种过渡效果
    '$route' (to, from) {
      //获取到携带的标记
      const routerType = to.params.routerType
      if (routerType === 'push') {
        //当进入新页面的时候，保存新页面的名称到虚拟任务栈
        //跳转页面
        this.transitionName = 'fold-left'
        this.virtualTaskStack.push(to.name)
        console.log('to在下面')
        console.log(to)
      } else {
        //执行后退操作的时候，把最后一个页面从虚拟任务栈中弹出
        //后退页面
        this.transitionName = 'fold-right'
        this.virtualTaskStack.pop()
        console.log('想、---=====')
        console.log(to)
      }
      //初始化虚拟任务栈
      if (to.params.clearTask) {
        this.virtualTaskStack = ['Home']
      }
    }

  }
}
</script>

<style>
/**push页面时： 新页面进入动画 */
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: .5s
}
@keyframes fold-left-in {
  0% {
    transform: translate(100%, 0)
  }
  100% {
    transform: translate(0, 0)
  }
}
/**push页面时： 原页面退出动画 */
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: .5s
}
@keyframes fold-left-out {
  0% {
    transform: translate(0, 0)
  }
  100% {
    transform: translate(-100%, 0) 
  }
}
/**后退页面时： 即将展示页面的动画 */
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: .5s
}
@keyframes fold-right-in {
  0% {
    transform: translate(-100%, 0)
  }
  100% {
    transform: translate(0, 0) 
  }
}
/**后退页面时： 即将退出页面的动画 */
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: .5s
}
@keyframes fold-right-out {
  0% {
    transform: translate(0, 0)
  }
  100% {
    transform: translate(100%, 0) 
  }
}
</style>
