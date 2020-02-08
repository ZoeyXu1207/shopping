<template>
    <div class="goods-option">
        <!--一级筛选项-->
        <ul class="goods-option-list">
            <li class="goods-option-list-item" @click="OptionItemClick(item, index)"
              v-for="(item, index) in optionDatas" :key='item.id'>
                <a class="goods-option-list-item-content">
                    <span class="content-name" 
                    :class="{'content-name-active': selectOption.id === item.id}"
                    >
                    {{item.name}}
                    </span>
                    <span class="content-caret" v-if="item.subs.length > 0"
                        :class="[selectOption.id === item.id && isShowSubContent ? 'open' : 'close']"></span>
                </a>
            </li>
        </ul>
        
        <!--子选项内容-->
        <transition name="fold-height">
          <div class="option-sub-content" v-show="isShowSubContent">
            <ul class="option-sub-content-list">
                <li class="option-sub-content-list-item" @click="OptionSubClick(item)"
                  v-for="item in selectOption.subs" :key='item.id'>
                    <a class="sub-item-content">
                        <span class="sub-content-name" 
                        :class="{'content-name-active': selectOption.id === item.id}"
                        >
                        {{item.name}}
                        </span>
                        <img class="sub-content-select" :src='select' v-show="selectOption.id === item.id"/>
                    </a>
                </li>
            </ul>
            <!--遮盖层-->
            <div class="cover" v-show="isShowSubContent" @click="isShowSubContent= false"></div>
          </div>
        </transition>
        
    </div>
</template>

<script>
import select from '../../../assets/image/options-select.svg'
export default {
    name: 'GoodsOption',
    data () {
        return {
            select,
            //筛选器数据
            optionDatas: [
                {
                    id: '1',
                    name: '默认',
                    subs: [
                        {
                            id: '1',
                            name: '默认',
                        },
                        {
                            id: '1-2',
                            name: '价格由高到低',
                        },
                        {
                            id: '1-3',
                            name: '销量由高到低',
                        }

                    ]
                }, {
                    id: '2',
                    name: '有货优先',
                    subs: []
                }, {
                    id: '3',
                    name: '直营优先',
                    subs: []
                }
            ],
            //选中的筛选项
            selectOption: {},
            //子选项是否显示
            isShowSubContent: false
        }
    },
    methods: {
        /**
         * 1、如果子选项视图处于展开状态，则关闭掉子选项视图
         * 2、展示子选项视图
         *      1、选中项包含子选项
         *      2、当前筛选项处于选中状态
         * 3、设置选中项为用户点击的选项
         */
        OptionItemClick (item, index) {
            if(this.isShowSubContent == true) {
                this.isShowSubContent = false
                return
            }

            if(item.subs.length > 0 && this.selectOption.id == item.id) {
                this.isShowSubContent = true
            }
            this.selectOption = item
        },
        OptionSubClick (item) {
        /**
         * 1、设置选中项为用户点击的选项
         * 2、将选中项置顶
         * 3、关闭子选项视图
         */
          this.selectOption = item
          this.optionDatas.forEach(options => {
            options.subs.forEach (subOptions => {
                if (subOptions.id === item.id) {
                    options.id = subOptions.id;
                    options.name = subOptions.name;
                }
            })
          })
          this.isShowSubContent = false
        }
    },
    created () {
        this.selectOption = this.optionDatas[0]
    },
    watch: {
      /**
       * 监听筛选项改变
       */
      selectOption (newV) {
        this.$emit('optionsChange', newV.id)
      }
    }
}
</script>

<style lang='stylus' scoped>
.goods-option
  z-index: 2
  width: 100%
  border-bottom: .02rem solid #e5e5e5
  .goods-option-list
    display: flex
    width: 100%
    height: .92rem
    background: white
    .goods-option-list-item
      flex-grow: 1
      .goods-option-list-item-content
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        color: black
        .content-name
          font-size: .28rem
          margin-right: .16rem
        .content-name-active
          color: #d81e06
        .content-caret
          display: inline-block
          width: 0
          height: 0
          border-top: .14rem solid #d81e06
          border-left: .12rem solid transparent
          border-right: .12rem solid transparent
        .open
          transform: rotate(-180deg)
          transition: all .5s
        .close
          transform: rotate(0deg)
          transition: all .5s


  
  .option-sub-content
    position: absolute
    width: 100%
    max-height: 3.6rem
    overflow: hidden
    overflow-y: auto 
    background: white
    .sub-item-content
      color: black
      display: flex
      align-items: center
      border-top: .02rem solid #eeeeee
      padding: .16rem
      height: .88rem
      box-sizing: border-box
      .sub-content-name
        font-size: .24rem
        display: inline-block
        flex-grow: 1
      .content-name-active
        color: #d81e06
      .sub-content-select
        width: .36rem
        height: .36rem

  .cover
    height: 100%
    width: 100%
    position: fixed
    background: rgba(0,0,0,.3)

  .fold-height-enter-active
    animation-duration: 1s
    animation-name: fold-height-open

    @keyframes fold-height-open {
      0% {
        max-height: 0
      }
      100% {
        max-height: 3.6rem
      }
    }
  .fold-height-leave-active
    animation-duration: 1s
    animation-name: fold-height-close
    @keyframes fold-height-close {
      0% {
        max-height: 3.6rem
      }
      100% {
        max-height: 0
      }
    }
</style>