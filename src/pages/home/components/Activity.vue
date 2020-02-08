<template>
    <div class="activity">
        <img v-for="item in activityImgs" :key="item.id" :src="item.icon" class="activity-img"/>
    </div>
</template>

<script>
import {activity} from '../../../api/api'
export default {
    name: 'HomeActivity',
    data () {
        return {
            activityImgs: [],
        }
    },
    mounted () {
        activity ({

        }).then((res) => {
            console.log(res)
            this.activityImgs = res.data.data.list
        }).catch((error) => {
            console.log(error)
        })
    }
}
</script>

<style lang='stylus' scoped>
.activity
  max-height: 3.2rem
  margin-top: -.16rem
  position: relative
  z-index: 2
  .activity-img
    display: inline-block
    width: 33.33%
</style>