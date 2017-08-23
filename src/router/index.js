import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: require('@/pages/Login')
    },
    {
      path: '/',
      name: 'Index',
      component: require('@/pages/Index'),
      redirect: '/index',
      children:[
      	{
	        path: '/index',
	        name: 'IndexPage',
	        component: require('@/pages/IndexPage'),
        },
        {
	        path: '/goodsin',//商品入库
	        name: 'GoodsIn',
	        component: require('@/pages/stockmanage/GoodsIn'),
        },
        {
	        path: '/goodsout',//商品出库
	        name: 'GoodsOut',
	        component: require('@/pages/stockmanage/GoodsOut'),
        },
        {
	        path: '/goodshouse',//商品库存
	        name: 'GoodsHouse',
	        component: require('@/pages/stockmanage/GoodsHouse'),
        },
        {
	        path: '/stockallocation',//库存调拨
	        name: 'StockAllocation',
	        component: require('@/pages/stockmanage/StockAllocation'),
        },
        {
	        path: '/stocking',//库存盘点
	        name: 'Stocking',
	        component: require('@/pages/stockmanage/Stocking'),
        },
        {
	        path: '/stockdetail',//出入库明细
	        name: 'StockDetail',
	        component: require('@/pages/stockmanage/StockDetail'),
        },
        {
	        path: '/goodssummary',//商品收发汇总
	        name: 'GoodsSummary',
	        component: require('@/pages/stockmanage/GoodsSummary'),
        },
      ]
    },
  ]
})
