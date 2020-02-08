<template>
  <div class="wrap" ref="goods" @onScrollChange="onScrollChange">
    <div class="goods-list-page">
        
        <navigation-bar :pageName='pageName' class="back"
        @onLeftClick='onBackClick'>
          <template v-slot:nav-right>
              <img :src="layoutType.icon" @click="typeChange">
          </template>
        </navigation-bar>
        <div class="goods-list-page-content">
            <goods-option @optionsChange = 'onGoodsOptionsChange'></goods-option>
        </div>
        <goods-list :layoutType="this.layoutType.type" :sort='sortType'></goods-list>
    </div>
  </div>
</template>

<script>
import NavigationBar from './../home/components/NavigationBar'
import GoodsOption from './components/Option'
import GoodsList from './components/List'
import list from '../../assets/image/list-type.svg'
import grid from '../../assets/image/grid-type.svg'
import waterfall from '../../assets/image/waterfall-type.svg'
export default {
    name:'Goods',
    data () {
        return {
            pageName: '商品列表',
            top: 0,
            //goods展示形式数据源
            layoutTypeDatas: [
                {
                    //垂直列表
                    type: '1',
                    icon: list
                }, {
                    //网格布局
                    type: '2',
                    icon: grid
                }, {
                    //瀑布流布局
                    type: '3',
                    icon: waterfall
                }
            ],
            //当前goods展示形式
            layoutType: {},
            //筛选项的展示
            sortType: '1'
        }
    },
    created () {
        this.layoutType = this.layoutTypeDatas[0]
    },
    components: { 
        NavigationBar,
        GoodsOption,
        GoodsList,
    },
    methods: {
      onBackClick () {
          this.$router.go(-1)
      },
      typeChange () {
          //console.log('执行了')
          if(this.layoutType.type === '1') {
              this.layoutType = this.layoutTypeDatas[1]
          } else if (this.layoutType.type === '2') {
              this.layoutType = this.layoutTypeDatas[2]
          } else {
              this.layoutType = this.layoutTypeDatas[0]
          }
      },
      onGoodsOptionsChange (sortType) {
          this.sortType = sortType
      },
      onScrollChange () {
        this.top = document.documentElement.scrollTop || document.body.scrollTop
        //console.log(this.top)
        //console.log('商品列表页面执行了0')
      }
    },
    activated () {
        //console.log('商品列表页面执行了')
        this.$refs.goods.scrollTop = this.top
    },
    mounted () {
        window.addEventListener('scroll', this.onScrollChange)
    },
    destroyed () {
        window.removeEventListener('scroll', this.onScrollChange)
    }
}
</script>

<style lang='stylus' scoped>
.wrap
  position: absolute
  .goods-list-page
    height: 100%
    width: 100%
    background: #eeeeee
    display: flex
    flex-direction: column
    .goods-list-page-content
      height: 100%
      display: flex
      flex-direction: column
      margin-top: .8rem
    .back
      position: fixed
</style>