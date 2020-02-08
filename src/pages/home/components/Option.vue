<template>
    <div class="wrapper">
      
        <div class="option" v-for="item in optionData" :key="item.id" @click="onItemClick" >
          
            <img class="option-img" :src="item.icon"/>
            <p class="option-p">{{item.title}}</p>
          
        </div>
      
    </div>
</template>

<script>
import p1 from '@/assets/image/jingDongChaoShi.png'
import p2 from '@/assets/image/haiTunQuanQiu.png'
import p3 from '@/assets/image/jingDongFuShi.png'
import p4 from '@/assets/image/jingDongShengXian.png'
import p5 from '@/assets/image/jingDongDaoJia.png'
import p6 from '@/assets/image/chongZhiJiaoFei.png'
import p7 from '@/assets/image/jingDongPinGou.png'
import p8 from '@/assets/image/lingJuan.png'
import p9 from '@/assets/image/zhuanQian.png'
import p10 from '@/assets/image/quanBu.png'
export default {
    name: 'HomeOption',
    data () {
        return {
            optionData: [
                {
                    id: '1',
                    icon: p1,
                    title: '京东超市'
                }, {
                    id: '2',
                    icon: p2,
                    title: '海屯全球'
                }, {
                    id: '3',
                    icon: p3,
                    title: '京东服饰'
                }, {
                    id: '4',
                    icon: p4,
                    title: '京东生鲜'
                }, {
                    id: '5',
                    icon: p5,
                    title: '京东到家'
                }, {
                    id: '6',
                    icon: p6,
                    title: '充值缴费'
                }, {
                    id: '7',
                    icon: p7,
                    title: '9.9元拼'
                }, {
                    id: '8',
                    icon: p8,
                    title: '领劵'
                }, {
                    id: '9',
                    icon: p9,
                    title: '赚钱'
                }, {
                    id: '10',
                    icon: p10,
                    title: '全部'
                }
            ]
        }
    },
    methods: {
        onItemClick () {
            this.$router.push({
                name: 'Goods',
                params: {
                    routerType: 'push'
                }
            })
        }
    }
}
</script>

<style lang='stylus' scoped>
.wrapper
  display: flex
  flex-wrap: wrap
  padding-bottom: .28rem
  text-align: center
  background: white
  .option
    width: 20%
    margin-top: .2rem
    .option-img
      width: .8rem
      height: .8rem
    .option-p
      margin-top: .12rem

</style>