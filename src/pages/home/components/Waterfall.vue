<template>
    <div class="goods goods-waterfall" 
       :style="{height: goodsViewHeight}">
        <div class="goods-item goods-waterfall-item" ref="goodsItem" @click="onItemClick(item)"
          v-for="(item, index) in dataSource" :key="item.id" :style='goodsItemStyles[index]'>
            <img class="goods-item-img" :src="item.img" 
              :style="imgStyles[index]"/>
            <div class="goods-item-desc">
                <p class="goods-item-desc-name goods-item-desc-name-desc" 
                  :class="{'goods-item-desc-name-hint' :!item.isHave}">
                    <home-direct v-if="item.isDirect"></home-direct>
                    <home-no-have v-if="!item.isHave"></home-no-have>
                    {{item.name}}
                </p>
                <div class="goods-item-desc-data">
                    <p class="goods-item-desc-data-price">￥{{item.price}}</p>
                    <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
import {initdata} from '../../../api/api'
import HomeDirect from '../components/Direct'
import HomeNoHave from '../components/NoHave'
export default {
    name: 'HomeWaterfall',
    components: {
      HomeDirect,
      HomeNoHave,
    },
    data () {
        return {
            dataSource: [],
            //最大高度
            MAX_IMG_HEIGHT: 230,
            //最小高度
            MIN_IMG_HEIGHT: 178,
            //图片样式集合
            imgStyles: [],
            //item margin
            ITEM_MARGIN_SIZE: 8,
            //item 样式集合
            goodsItemStyles: [],
            // goods 组件的高度
            goodsViewHeight: 0,
        }
    },
    mounted () {
        initdata ({

        }).then((res) => {
            console.log(res)
            this.dataSource = res.data.data.list
            this.initImgStyles()
            //调用创建瀑布流的方法（等到DOM创建完成之后）
            this.$nextTick(() => {
              this.initWaterfall()
            })
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        onItemClick (item) {
          if(!item.isHave) {
            alert('该商品暂无库存')
          } else {
            this.$router.push({
              name: 'Detail',
              params: {
                routerType: 'push',
                clearTask: true

              },
              //把传递的数据附加到我们的URL上
              query: {
                goodsId: item.id
              }
            })
          }
        },
        imgHeight () {
           let result =Math.floor(Math.random() * (this.MAX_IMG_HEIGHT-this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT) 
           return result
        },
        initImgStyles () {
            this.dataSource.forEach(item => {
              //随机生成的图片高度
              let imgHeight = this.imgHeight() + 'px'
              //push图片高度到img样式集合
              this.imgStyles.push({
                height: imgHeight
              })
            })

        },
        initWaterfall () {
          //获取所有的item元素
          let $goodsItem = this.$refs.goodsItem
          let leftHeightTotal = 0, rightHeightTotal = 0
          if (!$goodsItem) {
            return
          } else {
            $goodsItem.forEach(($el, index) => {
              let goodsItemStyle = {}
              let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE

              if(leftHeightTotal <= rightHeightTotal) {
                goodsItemStyle = {
                  left: '0px',
                  top: leftHeightTotal + 'px'
                }
                //更新左侧距离顶部的高度
                leftHeightTotal += elHeight
              } else {
                goodsItemStyle = {
                  right: '0px',
                  top: rightHeightTotal + 'px'
                }
                rightHeightTotal += elHeight
              }
              //保存计算出的item的所有样式，配置到item上
              this.goodsItemStyles.push(goodsItemStyle)
            })
            //对比左右两侧最大的高度，最大的高度为goods组件的高度
            this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal ) + 'px'

          }
        }
    }
}
</script>

<style lang='stylus' scoped>
.goods
  background: #eeeeee
  .goods-item
    background: white
    padding: .16rem
    box-sizing: border-box
    .goods-item-desc
      width: 100%
      margin-top: .2rem
      .goods-item-desc-name
        font-size: .28rem
        text-align: .36rem
      .goods-item-desc-name-desc
        overflow: hidden
        text-overflow: ellipsis 
        word-break: break-word
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        display: -webkit-box
      .goods-item-desc-name-hint
        color: #9e9e9e
      .goods-item-desc-data
        width: 100%
        display: flex
        align-items: center
        justify-content: space-between
        margin-top: .16rem
        .goods-item-desc-data-price
          font-size: .32rem
          color: #d81e06
          font-weight: 500
        .goods-item-desc-data-volume
          font-size: .28rem
          color: #9e9e9e

.goods-waterfall
  position: relative
  margin: .16rem
  .goods-waterfall-item
    position: absolute 
    width: 49%
    border-radius: .12rem
    .goods-item-img
      width: 100%



</style>