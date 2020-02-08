<template>
    <div class="shop">
        <navigation-bar :pageName='pageName' :isShowBack='isShowBack'>
            
        </navigation-bar>
        <shop-content :shoppingDatas='shoppingDatas' @computeGoodsTotal='computeGoodsTotal'></shop-content>
        <shop-pay :shoppingDatas='shoppingDatas' ref="pay"></shop-pay>
        <shop-footer></shop-footer>
    </div>
</template>

<script>
import ShopFooter from './components/Footer'
import NavigationBar from './../home/components/NavigationBar'
import ShopContent from './components/Content'
import ShopPay from './components/Pay'
export default {
    name: 'Shop',
    data () {
        return {
            pageName: '购物',
            isShowBack: false,
            shoppingDatas: this.$store.state.shoppingDatas

        }
    },
    components: {
        ShopFooter,
        NavigationBar,
        ShopContent,
        ShopPay,
    },
    methods: {
        computeGoodsTotal () {
            console.log('父组件被调用了')
            let _this = this
            _this.$refs.pay.computeGoodsTotal()
        }
    }
}
</script>

<style lang='stylus' scoped>
.shop
  width: 100%
  height: 100%
  overflow: hidden
  display: flex
  flex-flow: column
</style>