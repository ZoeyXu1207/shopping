<template>
    <div class="buy-page">
        <navigation-bar :pageName='pageName'
        @onLeftClick='onBackClick'></navigation-bar>
          <!--内容区-->
          <div class="buy-page-content">
              <!--购买的商品-->
              <div class="buy-page-content-goods">
                  <!--商品图片-->
                  <img class="goods-img" :src="goodsData.img"/>
                  <!--商品描述-->
                  <div class="goods-desc">
                      <!--商品名称-->
                      <p class="goods-desc-name">{{goodsData.name}}</p>
                      <!--商品价格-->
                      <p class="goods-desc-price">￥{{goodsData.price | priceValue}}</p>
                  </div>
              </div>
              <!--支付方式-->
              <ul class="content-list">
                  <li class="content-list-item" v-for="item in paymentDatas"
                  :key="item.id" @click="onPaymentItemClick(item)">
                    <!--支付方式的图标-->
                    <img class="item-icon" :src="item.icon"/>
                    <!--描述-->
                    <div class="item-desc">
                        <!--支付方式名称-->
                        <p class="item-desc-name">{{item.name}}</p>
                        <!--支付方式描述-->
                        <p class="item-desc-desc">{{item.desc}}</p>
                    </div>
                    <!--选中支付方式的标记-->
                    <img class="item-check" :src="getCheckIcon(selectPayment.id === item.id)"/>
                  </li>
              </ul>
          </div>

        <!--立即购买-->
        <div class="payNow">立即购买</div>
    </div>
</template>

<script>
import {goods} from '../../api/api'
import alipay from '../../assets/image/alipay.svg'
import wechat from '../../assets/image/weichat.png'
import check from '../../assets/image/check.svg'
import noCheck from '../../assets/image/no-check.svg'
import NavigationBar from '../home/components/NavigationBar'
export default {
    name: 'Buy',
    components: {
        NavigationBar,
    },
    data () {
      return {
        pageName: '立即购买',
        //商品数据
        goodsData: {},
        //支付方式数据源
        paymentDatas: [
          {
            id: '1',
            name: '支付宝支付',
            desc: '数亿用户都在用，安全可信托',
            icon: alipay
          },
          {
            id: '2',
            name: '微信支付',
            desc: '亿万用户选择，更快更安全',
            icon: wechat
          }
        ],
        //用户选中的支付方式
        selectPayment: {}
      }
    },
    created () {
      this.selectPayment = this.paymentDatas[0]
      this.getData()
    },
    methods: {
      getData() {
        goods (this.$route.query.goodsId)
        .then((res) => {
            console.log('我打印了')
            console.log(res)
            this.goodsData = res.data.data.goodsData
            
        }).catch((error) => {
            console.log(error)
        })
      },
      //返回按钮
      onBackClick () {
          this.$router.go(-1)
      },
      //支付方式切换
      onPaymentItemClick (item) {
          this.selectPayment = item
      },
      //返回支付方式标记的图片
      getCheckIcon (isCheck) {
          return isCheck ? check : noCheck
      }
    }
}
</script>

<style lang='stylus' scoped>
.buy-page
  position: absolute
  height: 100%
  width: 100%
  background: #eeeeee
  .buy-page-content
    overflow: hidden
    height: 100%
    .buy-page-content-goods
      background: white
      padding: .16rem
      display: flex
      border-bottom: .02rem solid $e5e5e5
      border-top: .02rem solid $e5e5e5
      margin-top: .16rem
      .goods-img
        width: 2rem
        height: 2rem
      .goods-desc
        width: 100%
        display: flex
        flex-direction: column
        justify-content: space-between
        padding: 0 .16rem
        .goods-desc-name
          font-size: .28rem
          line-height: .36rem
        .goods-desc-price
          font-size: .32rem
          color: #d81e06
          font-weight: 500  
    .content-list
      margin-top: .16rem
      .content-list-item
        display: flex
        background: white
        border-bottom: .02rem solid #e5e5e5
        padding: .16rem
        align-items: center
        .item-icon
          width: .6rem
          height: .6rem
        .item-desc
          margin-left: .24rem
          flex-grow: 1
          .item-desc-name
            font-size: .28rem
          .item-desc-desc
            font-size: .24rem
            margin-top: .12rem
            color: rgba(0,0,0,.4)
        .item-check
          width: .32rem
          height: .32rem
  .payNow
    width: 90%
    height: .92rem
    line-height: .92rem
    margin-left: 5%
    display: block
    background: #d81e06
    border-radius: 1rem
    font-size: .32rem
    color: white
    text-align: center
    position: absolute
    bottom: 1.04rem
        

        
</style>