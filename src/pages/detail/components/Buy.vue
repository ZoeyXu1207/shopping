<template>
    <div class="detail-buy">
        <div class="detail-buy-add" @click="onAdd()">
          加入购物车
        </div>
          <div class="detail-buy-now" @click="onBuy">
            立即购买
          </div>
    </div>
</template>

<script>
export default {
    name: 'DetailBuy',

    props: {
      goodsData: {}
    },
    methods: {
      //跳转到购买页面
      onBuy () {
        this.$router.push({
          name: 'Buy',
          params: {
            routerType: 'push'
          },
          query: {
            goodsId: this.goodsData.id
          }
          
          
        })
        //console.log('打印了-----')
        //console.log(this.goodsData)
      },
      //跳转到购物车页面
      onAdd () {
        /**
         * 保存商品到购物车数据中，不能直接通过this.$store.addShoppingData()
         * 要用commit调用方法
         */
        this.$store.commit('addShoppingData', this.goodsData)
        //console.log(this.goodsData)
        alert('添加成功')
        this.$router.push({
          name: 'Shop',
          params: {
            routerType: 'push'
          },
          query: {
            goodsId: this.goodsId
          }
        })
      }
    }
}
</script>

<style lang='stylus' scoped>
.detail-buy
  position: fixed
  padding-left: 3.4rem
  background: white
  bottom: 0
  border-top: .02rem solid #9e9e9e
  height: .86rem
  line-height: .86rem
  text-align: right
  z-index: 3
  .detail-buy-add
    display: inline-block
    width: 2rem
    text-align: center
    font-size: .32rem
    color: white
    background: #d81e06
  .detail-buy-now
    display: inline-block
    width: 2rem
    text-align: center
    font-size: .32rem
    color: white
    background: darkgoldenrod 
</style>