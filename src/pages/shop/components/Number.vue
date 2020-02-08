<template>
    <div class="number">
        <span class="number-less" :class="{'number-disabled' : number === 1}" 
        @click="onLessClick">-</span>
        <span class="number-number">{{number}}</span>
        <span class="number-add" @click="onAddClick">+</span>
    </div>
</template>

<script>
export default {
    name: 'ShopNumber',
    data () {
        return {
          //数量数据源
          number: 1,
        }
    },
    props: {
        //父组件指定的默认数量
        defaultNumber: {
            type: Number,
            default: 1
        }
    },
    methods: {
        onLessClick () {
            if (this.number === 1) {
                return
            }
            this.number -= 1
        },
        onAddClick () {
            this.number += 1
        }
    },
    watch: {
        defaultNumber: {
            immediate: true, //immediate选项可以开启首次赋值监听
            handler (newVal, oldVal) {
                this.number = newVal
            }
        },
        //监听数量的变化，当数量发生变化时，通知父组件
        number (newV) {
            this.$emit('onChangeNumber', newV)
        }
    }
}
</script>

<style lang='stylus' scoped>
.number
  display: flex
  font-size: .28rem
  height: .4rem
  line-height: .4rem
  .number-less
    width: .6rem
    text-align: center
    display: inline-block
    font-weight: 500
  .number-number
    width: .6rem
    text-align: center
    display: inline-block
    font-weight: 500
    background: #eeeeee
    padding: 0 .08rem
  .number-add
    width: .6rem
    text-align: center
    display: inline-block
    font-weight: 500
  .number-disabled
    color: rgba(0,0,0,.3)
</style>