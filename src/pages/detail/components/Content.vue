<template>
    <div class="desc">
        <div class="content-desc-item">
            <p class="item-price">￥{{goodsData.price | priceValue}}</p>
            <p class="item-name">
                <home-direct v-if="goodsData.isDirect"></home-direct>
                {{goodsData.name}}
            </p>
        </div>
        <div class="content-desc-item">
            <p class="item-select">已选<span class="single-row">{{goodsData.name}}</span>
                
            </p>
            <div class="item-support">
                <ul class="item-support-list">
                    <li v-for="item in attachDatas" :key='item.index' 
                    class="item-support-list-item">
                    <img class="img" src="../../../assets/image/support.svg">
                    <span class="span">{{item}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="desc-detail">
            <img class="detail-img" v-for="item in goodsData.detailImgs" 
            :key='item.index'  :src="item">
        </div>
    </div>
</template>

<script>
import HomeDirect from '../../home/components/Direct'
export default {
    name: 'DetailContent',
    components: {
        HomeDirect,
    },
    props: {
        goodsData: Object,
    },
    data () {
        return {
            attachDatas: [
                '可配送海外',
                '京东发货&售后',
                '京准达',
                '211限时达',
                '可自提',
                '不可使用优惠券',
            ]
            
        }
    }
}
</script>

<style lang='stylus' scoped>
.desc
  width: 100%
  background: #eeeeee
  margin-bottom: .16rem
  padding-bottom: .58rem
  .content-desc-item
    background: white
    padding: .16rem
    margin-bottom: .16rem
    .item-price
      font-size: .4rem
      color: #d81e06
      font-weight: 500
    .item-name
      margin-top: .16rem
      font-size: .32rem
      font-weight: 500
      line-height: .4rem
    .item-select
      font-size: .30rem
      height: .88rem
      display: flex
      align-items: center
      border-bottom: .02rem solid #e5e5e5
      .single-row
        width: 80%
        color: #333333
        font-size: .32rem
        font-weight: bold
        margin-left: .08rem
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        display: inline-block
    .item-support
      margin-top: .32rem
      .item-support-list
        display: flex
        flex-wrap: wrap 
        .item-support-list-item
          display: flex
          align-items: center
          padding: .12rem 0
          margin-right: .32rem
          .img 
            width: .24rem
            margin-right: .32rem
          .span
            font-size: .24rem
            color: #9e9e9e
  .desc-detail
    .detail-img
      width: 100%
</style>