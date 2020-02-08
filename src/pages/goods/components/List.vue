<template>
    <div class="goods" 
      :class='layoutClass' :style="{height: goodsViewHeight}">
        <div class="goods-item" ref="goodsItem"
          :class="layoutItemClass"
          v-for="(item, index) in sortGoodsData" :key="item.id"
          @click="onItemClick(item)"
          :style='goodsItemStyles[index]'>
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
import HomeDirect from '../../home/components/Direct'
import HomeNoHave from '../../home/components/NoHave'
export default {
    name: 'GoodsList',
    components: {
      HomeDirect,
      HomeNoHave,
    },
    props: {
      /* 在父元素中指定的展示形式
       * 1:垂直列表
       * 2:网格布局
       * 3.瀑布流布局
      */
      layoutType: {
        type: String,
        default: '1'
      },
      isScroll: {
        type: Boolean,
        default: true
      },
      /**
       * 排序规则（依赖option数据源的ID）
       * 1： 默认
       * 1-2： 价格由高到低
       * 1-3：销量由高到低
       * 2：有货优先
       * 3：直营优先
       */
      sort: {
        type: String,
        default: '1'
      }
    },
    data () {
        return {
            // 数据源
            dataSource: [],
            //排序数据
            sortGoodsData: [],
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
            goodsViewHeight: '100%',
            //不同展示形式下的类名
            layoutClass: 'goods-grid',
            layoutItemClass: 'goods-grid-item',
        }
    },
    mounted () {
        initdata ({

        }).then((res) => {
            console.log(res)
            this.dataSource = res.data.data.list
            //数据排序
            this.setSortDoodsData()
            //设置布局
            this.initLayout()
            
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        imgHeight () {
           let result =Math.floor(Math.random() * (this.MAX_IMG_HEIGHT-this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT) 
           return result
        },
        initImgStyles () {
            let imgHeight = this.imgHeight() + 'px'
            this.imgStyles.push({
                height: imgHeight
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

            //在不允许list单独滑动的时候
            //if (!this.isScroll) {
              //对比左右两侧最大的高度，最大的高度为goods组件的高度
              this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal ) + 'px'

            //}
            
          }
        },
        initLayout () {
          //初始化数据
          this.goodsViewHeight = '100%'
          this.layoutItemClass = []
          this.imgStyles = []
          //为不同的layoutType设置不同的展示类
          switch(this.layoutType) {
            //垂直列表
            case '1':
              this.layoutClass = 'goods-list'
              this.layoutItemClass = 'goods-list-item'
              break
            //网格布局
            case '2':
              this.layoutClass = 'goods-grid'
              this.layoutItemClass = 'goods-grid-item'
              break
            //瀑布流布局
            case '3':
              this.layoutClass = 'goods-waterfall'
              this.layoutItemClass = 'goods-waterfall-item'
              this.initImgStyles()
              //调用创建瀑布流的方法（等到DOM创建完成之后）
              this.$nextTick(() => {
              this.initWaterfall()
            })
          }
        },
        setSortDoodsData () {
          switch (this.sort) {
            //默认
            case '1':
              //深拷贝，不改变原数组
              this.sortGoodsData = this.dataSource.slice(0)
              break
            //价格由高到低
            case '1-2':
              this.getSortGoodsDataFromKey('price')
              break
            //销量由高到低
            case '1-3':
              this.getSortGoodsDataFromKey('volume')
              break
            //有货优先
            case '2':
              this.getSortGoodsDataFromKey('isHave')
              break
            //直营优先
            case '3':
              this.getSortGoodsDataFromKey('isDirect')
              break
          }
        },
        /**
         * 根据传入的key来进行排序
         */
        getSortGoodsDataFromKey (key) {
          /**
           * sort可以完成数组的数据排序
           * 当接收的值为负数的时候，表示goods1排列在goods2之前
           * 当接收的值为正数的时候，表示goods1排列在goods2之后
           * 当接收的值为0的时候，表示排序不变
           */
          this.sortGoodsData.sort((goods1, goods2) => {
            //根据传入的key获取对应的value
            let v1 = goods1[key]
            let v2 = goods2[key]
            //console.log('有钱了')
            //console.log(this.sortGoodsData)
            //对value进行对比
            //boolean类型的值（有货优先和直营优先）
            if (typeof v1 === 'boolean') {
              if (v1) {
                return -1
              }
              if (v2) {
                return 1
              }
              return 0
            }
            //float类型值的处理（价格，销量）
            if (parseFloat(v1) >= parseFloat(v2)) {
              return -1
            }
            return 1
          })
        },
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
        }
    },
    watch: {
      //监听layoutType
      layoutType () {
        this.initLayout()
      },
      //监听sort的改变
      sort () {
        this.setSortDoodsData()
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
  width: 359px
  margin: .16rem
  .goods-waterfall-item
    position: absolute 
    width: 49%
    border-radius: .12rem
    .goods-item-img
      width: 100%

.goods-list
  .goods-list-item
    display: flex
    border-bottom: .02rem solid #e5e5e5
    .goods-item-img
      width: 2.4rem
      height: 2.4rem
    .goods-item-desc
      display: flex
      flex-direction: column
      justify-content: space-between
      padding: .16rem

.goods-grid
  padding: .16rem
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  .goods-grid-item
    width: 49%
    border-radius: .12rem
    margin-bottom: .16rem
    .goods-item-img
      width: 100%
    





</style>