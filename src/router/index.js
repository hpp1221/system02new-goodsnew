import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: require('@/pages/Login')
    },
    {
      path: '/',
      component: require('@/pages/Index'),
      redirect: '/index',
      children:[
      	{
	        path: '/index',
	        component: require('@/pages/IndexPage'),
        },
        {
      		path: '/error',//错误页面
		      component: require('@/pages/Error')
		    },
        {
	        path: '/goodsin/list',//商品入库
	        component: require('@/pages/stockmanage/goodsin/List'),
        },
        {
	        path: '/goodsin/add',//添加入库
	        component: require('@/pages/stockmanage/goodsin/Add'),
        },
        {
	        path: '/goodsin/detail',//入库明细
	        component: require('@/pages/stockmanage/goodsin/Detail'),
        },
        {
	        path: '/goodsout/list',//商品出库
	        component: require('@/pages/stockmanage/goodsout/List'),
        },
        {
	        path: '/goodsout/add',//添加出库
	        component: require('@/pages/stockmanage/goodsout/Add'),
        },
        {
	        path: '/goodsout/detail',//入库明细
	        component: require('@/pages/stockmanage/goodsout/Detail'),
        },
        {
	        path: '/goodsstore/list',//商品库存
	        component: require('@/pages/stockmanage/goodsstore/List'),
        },
        {
	        path: '/stockallocation/list',//库存调拨
	        component: require('@/pages/stockmanage/stockallocation/List'),
        },
        {
	        path: '/stockallocation/add',//添加库存调拨
	        component: require('@/pages/stockmanage/stockallocation/Add'),
        },
        {
	        path: '/stockallocation/detail',//添加库存调拨
	        component: require('@/pages/stockmanage/stockallocation/Detail'),
        },
        {
	        path: '/stocking/stocking',//库存盘点
	        component: require('@/pages/stockmanage/stocking/stocking'),
        },
        {
	        path: '/inoutdetail/list',//出入库明细
	        component: require('@/pages/stockmanage/inoutdetail/List'),
        },
        {
	        path: '/stocksingledetail',//单个明细
	        component: require('@/pages/stockmanage/StockSingleDetail'),
        },
        {
	        path: '/goodssummary/list',//商品收发汇总
	        component: require('@/pages/stockmanage/goodssummary/List'),
        },
        
        
        {
	        path: '/createorder',//创建订单
	        component: require('@/pages/ordermanage/CreateOrder'),
        },
        {
	        path: '/orderlist',//订单列表
	        component: require('@/pages/ordermanage/OrderList'),
        },
        {
	        path: '/personalorder',//个人订单
	        component: require('@/pages/ordermanage/PersonalOrder'),
        },
        {
	        path: '/orderdetail',//订单详情
	        component: require('@/pages/ordermanage/OrderDetail'),
        },
        {
	        path: '/ordersummary',//订单
	        component: require('@/pages/ordermanage/OrderSummary'),
        },
        
        {
	        path: '/goodslist',//商品列表
	        component: require('@/pages/goodsmanage/GoodsList'),
        },
        {
	        path: '/creategoods',//新增商品
	        component: require('@/pages/goodsmanage/CreateGoods'),
        },
        {
	        path: '/updategoods',//修改商品详情
	        component: require('@/pages/goodsmanage/UpdateGoods'),
        },
        {
	        path: '/multipleInputGoods',//修改商品详情
	        component: require('@/pages/goodsmanage/MultipleInputGoods'),
        },
        {
	        path: '/multipleInputImgs',//修改商品详情
	        component: require('@/pages/goodsmanage/MultipleInputImgs'),
        },
      ]
    },
  ]
})
