<template>
    <div>
        <div class="footer">
            <router-link to="/" tag="div">
              <div>
                <img class="footer-img" :src="shouyea">
                <p class="footer-p-active">首页</p>
              </div>
            </router-link>
            
            <router-link to="/shop" tag="div">
               <div>
                <img class="footer-img" :src="shoppinga">
                <p class="footer-p">购物车</p>
               </div>
            </router-link>
            <router-link to="/my" tag="div">
                <div>
                  <img class="footer-img" :src="minea">
                  <p class="footer-p">我的</p>
            </div>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import shouyea from '../../../assets/image/home-h.svg'
import shoppinga from '../../../assets/image/shopping-n.svg'
import minea from '../../../assets/image/my-n.svg'
export default {
    name: 'HomeFooter',
    data () {
        return {
            shouyea,
            shoppinga,
            minea,
        }
    }
}
</script>

<style lang='stylus' scoped>
.footer
  display: flex
  justify-content: space-around
  position: fixed
  left: 0
  right: 0
  bottom: -.01rem
  text-align: center
  background: rgb(235, 235, 228)
  z-index: 99
  .footer-img
    width: .5rem
    height: .5rem
  .footer-p
    font-size: .26rem
    padding-top: .04rem
  .footer-p-active
    font-size: .26rem
    padding-top: .04rem
    color: red
   
</style>
