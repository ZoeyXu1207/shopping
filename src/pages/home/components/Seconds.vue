<template>
    <div class="seconds">
        <div class="seconds-wrap">
            <p class="seconds-wrap-title">京东秒杀</p>
            <count-down :endHours="23"></count-down>
        </div>
        <div class="seconds-content">
            <div class="seconds-item" v-for="item in secondsData" :key="item.id">
                <img class="seconds-img" :src="item.icon"/>
                <p class="seconds-price">￥{{item.price | priceValue}}</p>
                <p class="seconds-oldprice">￥{{item.oldPrice | priceValue}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {fast} from '@/api/api'
import CountDown from './CountDown'
export default {
    name: 'HomeSeconds',
    components: {
        CountDown
    },
    data () {
        return {
            secondsData: []
        }
    },
    mounted () {
        fast({

        }).then((res) => {
            console.log(res)
            this.secondsData = res.data.data.list
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>

<style lang='stylus' scoped>
.seconds
  background: #eee
  border-radius: .12rem
  margin: .16rem
  .seconds-wrap
    display: flex
    padding: .16rem
    .seconds-wrap-title
      display: inline-block
  .seconds-content
    padding: .16rem 0
    display: flex
    overflow: hidden
    overflow-x: scroll
    .seconds-item
      padding: 0 .24rem
      text-align: center
      .seconds-img
        width: 1.32rem
        height: 1.32rem
      .seconds-price
        color: #d81e06
        font-size: .32rem
        margin-top: .2rem
      .seconds-oldprice
        color: #9e9e9e
        margin-top: .1rem
        text-decoration: line-through

    
</style>