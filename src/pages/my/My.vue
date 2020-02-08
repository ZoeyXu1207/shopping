<template>
    <div>
        <navigation-bar :pageName='pageName' :isShowBack='isShowBack'></navigation-bar>
        <my-personal></my-personal>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyFooter from './components/Footer'
import NavigationBar from './../home/components/NavigationBar'
import MyPersonal from './components/Personal'
export default {
    name: 'My',
    data () {
        return {
            pageName: '我的',
            isShowBack: false,
        }
    },
    components: {
        MyFooter,
        NavigationBar,
        MyPersonal,
    }
}
</script>

<style lang='stylus' scoped>

</style>
