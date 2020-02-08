<template>
    <div class="shopping-content-total">
            <!--全选的check-->
            <div class="shopping-content-total-check">
                <img class="total-check-img" @click="onAllCheckClick"
                :src="checkImg(totalData.isAll)"/>
                <p class="total-check-all">全选</p>
            </div>
            <!--总价格-->
            <div class="shopping-content-total-price">
                <p class="price-total">合计：
                    <span class="price-total-price">￥{{totalData.totalPrice | priceValue}}</span>
                </p>
                <p class="price-total-all">总额：
                    <span class="price-total-all-price">￥{{totalData.totalPrice | priceValue}}</span>
                    &nbsp;&nbsp;
                    立减<span class="price-total-all-price">￥0.00</span>
                </p>
            </div>
            <!--结算-->
            <div class="total-commit">
                去结算{{totalData.goodsNumber}}
            </div>
        </div>
</template>

<script>
import noCheck from '../../../assets/image/no-check.svg'
import check from '../../../assets/image/check.svg'
export default {
    name: 'ShopPay',
    data () {
      return {
        //总计
        totalData: {
            //是否全选
            isAll: false,
            //总价格
            totalPrice: 0,
            //总数量
            goodsNumber: 0,
        }
      }
    },
    props: {
      shoppingDatas: '',
    },
    methods: {
      //全选check点击事件
      onAllCheckClick () {
        this.totalData.isAll = !this.totalData.isAll
        //为每个商品设置选中标记为当前是否全选标记
        this.shoppingDatas.forEach(item => {
          item.isCheck = this.totalData.isAll
        })
        //统计数据
        this.computeGoodsTotal()
      },
      checkImg (isCheck) {
        return isCheck ? check : noCheck
      },
      //计算总计数据
      computeGoodsTotal () {
        //先初始化totalData的数据,让是否全选默认为true，当存在商品没有被选中的时候，则把isAll变为false
        this.totalData = {
            //是否全选
            isAll: true,
            //总价格
            totalPrice: 0,
            //总数量
            goodsNumber: 0,         
        }
        //计算总计数据
        /**
         * 遍历数据源， 如果有商品出于未选中状态下，
         * 则把isAll变为false，
         * 如果商品出于选中状态下，则计算该商品总价格和数量
         */
        this.shoppingDatas.forEach(item => {
          //如果商品出于选中状态下，则计算该商品总价格和数量
          if (item.isCheck) {
            this.totalData.totalPrice += parseFloat(item.price) * parseInt(item.number)
            this.totalData.goodsNumber += parseInt(item.number)
          } 
          //如果商品处于未选中状态下，则不需要计算该商品的数据和价格，而且要把全选的isAll变为false
          else {
            this.totalData.isAll = false
          }
        })
      }
    }
}
</script>

<style lang='stylus' scoped>
  .shopping-content-total
    position: fixed
    left: 0
    right: 0
    bottom: .8rem
    height: 1.12rem
    box-sizing: border-box
    display: flex
    align-items: center
    background: white
    border-top: .02rem solid #e5e5e5
    .shopping-content-total-check
      display: flex
      align-items: center
      margin: 0 .16rem
      .total-check-img
        width: .36rem
        height: .36rem
        padding: .12rem
      .total-check-all
        font-size: .32rem
    .shopping-content-total-price
      flex-grow: 2
      display: flex
      flex-direction: column
      .price-total
        font-size: .32rem
        margin-bottom: .12rem
        .price-total-price
          font-weight: bold
      .price-total-all
        font-size: .24rem
        .price-total-all-price
          font-weight: bold
    .total-commit
      width: 2.4rem
      height: 100%
      font-size: .32rem
      background: #d81e06
      color: white
      display: flex
      align-items: center
      justify-content: center
</style>