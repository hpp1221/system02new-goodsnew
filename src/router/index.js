import Vue from 'vue'
import Router from 'vue-router'
import Stock from './routes/stock'//库存模块
import Order from './routes/order'//订单模块
import Goods from './routes/goods'//商品模块
import Personal from './routes/personal'//个人中心模块
import Dictionary from './routes/dictionary'//业务数据模块
import Supplier from './routes/supplier'//供应商模块
import Store from './routes/store'//门店模块
import Client from './routes/client'//客户模块
import Tenant from './routes/tenant'//租户模块
Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [{
    path: '/login',
    component: require('@/pages/user/Login')
  },
    {
      path: '/',
      component: require('@/pages/Index'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: require('@/pages/IndexPage'),
        },
        {
          path: '/error', //错误页面
          component: require('@/pages/Error')
        },

        ...Stock,
        ...Order,
        ...Goods,
        ...Personal,
        ...Dictionary,
        ...Supplier,
        ...Store,
        ...Client,
        ...Tenant
      ]
    },
  ]
})
