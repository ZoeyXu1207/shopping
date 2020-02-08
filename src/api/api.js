import axios from 'axios'

//let api = 'https://easy-mock.com/mock/5ceb51b551e3de74af53fe54/imooc/api/'
let api = 'http://39.105.131.75:3001/'

//首页轮播
export const banner = () => {
    return axios.get((api + 'swiper?token=f51ec5c0-d94b-11e9-94fb-ebf7e4fa4d3a'))
}

//首页活动

export const activity = () => {
    return axios.get((api + 'activitys?token=f51ec5c0-d94b-11e9-94fb-ebf7e4fa4d3a'))
}

//首页秒杀
export const fast  = () => {
    return axios.get((api + 'seconds?token=f51ec5c0-d94b-11e9-94fb-ebf7e4fa4d3a'))
}

//首页瀑布流
export const initdata  = () => {
    return axios.get((api + 'goods?token=f51ec5c0-d94b-11e9-94fb-ebf7e4fa4d3a'))
}

//商品详情页
export const goods = (goodsId) => {
    return axios.get((api + "goodsDetail?goodsId=") + goodsId + '&token=f51ec5c0-d94b-11e9-94fb-ebf7e4fa4d3a')
}