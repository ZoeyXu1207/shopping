<template>
    <div class="content">
        <div class="shopping-content">
            <div class="shopping-content-list">
                <!--商品-->
                  <div class="content-item" v-for="(item, index) in shoppingDatas" :key='item.id'>
                    <!--check-->
                    <img class="content-item-check" @click="onGoodsCheckClick(item)"
                    :src="checkImg(item.isCheck)"/>
                    <!--图片-->
                    <img class="content-item-img" :src="item.img"/>
                    <!--描述-->
                    <div class="content-item-desc">
                        <!--名称-->
                        <p class="content-item-desc-name">
                            <!--直营-->
                            <shop-direct></shop-direct>
                            {{item.name}}
                        </p>
                        <div class="content-item-desc-data">
                            <!--价格-->
                            <p class="content-item-desc-data-price">￥{{item.price | priceValue}}</p>
                            <!--商品数量的控制组件-->
                            <shop-number :defaultNumber='item.number'
                            @onChangeNumber='onChangeNumber(arguments, item, index)'></shop-number>
                        </div>
                    </div>
                
                
                  </div>

                
            </div>
        </div>    
    </div>
</template>

<script>
import noCheck from '../../../assets/image/no-check.svg'
import check from '../../../assets/image/check.svg'
import ShopDirect from './Direct'
import ShopNumber from './Number'
export default {
    name: 'ShopContent',
    data () {
      return {
        defaultNumber: 1,
        isCheck: false,
      }
    },
    props: {
        shoppingDatas: '',
    },
    watch: {
      defaultNumber () {
        console.log('执行了')
        console.log(this.defaultNumber)
      }
      
    },
    components: {
        ShopDirect,
        ShopNumber,
    },
    methods: {
      onChangeNumber ($arguments, item, index) {
        //更新商品数量
        let number = $arguments[0]



        //修改对应的商品数量
        this.$store.commit('changeShoppingDataNumber', {
          index: index,
          number: number
        })

        if(item.isCheck) {
          let _this = this
          _this.$emit('computeGoodsTotal')
        }
        console.log(item.number)
      },
      //商品check按钮点击事件
      onGoodsCheckClick (item) {
        console.log('content现在执行了')
        item.isCheck = !item.isCheck
        console.log(item)
        console.log(item.isCheck)
        let _this = this
        _this.$emit('computeGoodsTotal')
      },
      checkImg (isCheck) {
        return isCheck ? check : noCheck
      },

    }
}
</script>

<style lang='stylus' scoped>
.content
  width: 100%
  display: flex
  flex-flow: column
  padding-bottom: 1.9rem
  .shopping-content
    background: blue
    border-top: .02rem solid #e5e5e5
    height: 100%
    box-sizing: border-box
    display: flex
    flex-direction: column
    .shopping-content-list
      height: 100%
      overflow: hidden
      overflow-y: auto
      .content-item
        background: white
        padding: .16rem
        display: flex
        border-bottom: .02rem solid #e5e5e5
        .content-item-check
          width: .36rem
          height: .36rem
          align-self: center
          padding: .12rem
        .content-item-img
          width: 2rem
          height: 2rem
        .content-item-desc
          width: 100%
          display: flex
          flex-direction: column
          justify-content: space-between
          padding: 0 .16rem
          .content-item-desc-name
            font-size: .32rem
            line-height: .36rem
            overflow: hidden
            text-overflow: ellipsis 
            word-break: break-word
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            display: -webkit-box
          .content-item-desc-data
            width: 100%
            display: flex
            align-items: center
            justify-content: space-between
            margin-top: .16rem
            .content-item-desc-data-price
              font-size: .32rem
              color: #d81e06
              font-weight: 500
</style>