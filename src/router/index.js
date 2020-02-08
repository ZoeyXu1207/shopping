import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import My from '@/pages/my/My'
import Shop from '@/pages/shop/Shop'
import Goods from '@/pages/goods/Goods'
import Detail from '@/pages/detail/Detail'
import Buy from '@/pages/buy/Buy'
import Login from '@/pages/my/components/Login'
import Register from '@/pages/my/components/Register'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
      
    }, {
      path: '/my',
      name: 'My',
      component: My,
        
    }, {
        path: '/shop',
        name: 'Shop',
        component: Shop,
          
    },  {
      path: '/goods',
      name: 'Goods',
      component: Goods,
        
  }, {
    path: '/detail',
    name: 'Detail',
    component: Detail,
      
}, {
  path: '/buy',
  name: 'Buy',
  component: Buy,
    
}, {
  path: '/login',
  name: 'Login',
  component: Login,
    
}, {
  path: '/register',
  name: 'Register',
  component: Register,
    
}]
})
