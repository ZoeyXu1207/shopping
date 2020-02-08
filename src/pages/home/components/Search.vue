<template>
    <div class="search" :style='{background: bgcolor}'>
        <img class="search-icon" :src="icon"/>
        <span class="search-hint" :style="{color: hintcolor}">搜索</span>
    </div>
</template>

<script>
import seachimg from '../../../assets/image/search.svg'
export default {
    name: 'HomeSearch',
    props: {
        icon: {
            default: seachimg,
            style: String
        },
        hintcolor: {
            default: '#999999',
            type: String

        },
        bgcolor: {
            default: 'white',
            type: String
        }
    }
}
</script>

<style lang='stylus' scoped>
.search
  display: flex
  align-items: center
  width: 100%
  border-radius: .44rem
  margin: .12rem
  .search-icon
    width: .32rem
    margin-left: .16rem
  .search-hint
    margin-left: .16rem
    font-size: .24rem
</style>