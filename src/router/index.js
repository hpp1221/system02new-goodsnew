import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: require('@/pages/user/Login')
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
	        component: require('@/pages/stock/goodsin/List'),
        },
        {
	        path: '/goodsin/add',//添加入库
	        component: require('@/pages/stock/goodsin/Add'),
        },
        {
	        path: '/goodsin/detail',//入库明细
	        component: require('@/pages/stock/goodsin/Detail'),
        },
        {
	        path: '/goodsout/list',//商品出库
	        component: require('@/pages/stock/goodsout/List'),
        },
        {
	        path: '/goodsout/add',//添加出库
	        component: require('@/pages/stock/goodsout/Add'),
        },
        {
	        path: '/goodsout/detail',//入库明细
	        component: require('@/pages/stock/goodsout/Detail'),
        },
        {
	        path: '/goodsstore/list',//商品库存
	        component: require('@/pages/stock/goodsstore/List'),
        },
        {
	        path: '/stockallocation/list',//库存调拨
	        component: require('@/pages/stock/stockallocation/List'),
        },
        {
	        path: '/stockallocation/add',//添加库存调拨
	        component: require('@/pages/stock/stockallocation/Add'),
        },
        {
	        path: '/stockallocation/detail',//添加库存调拨
	        component: require('@/pages/stock/stockallocation/Detail'),
        },
        {
	        path: '/stocking/stocking',//库存盘点
	        component: require('@/pages/stock/stocking/stocking'),
        },
        {
	        path: '/inoutdetail/list',//出入库明细
	        component: require('@/pages/stock/inoutdetail/List'),
        },
        {
	        path: '/goodssummary/list',//商品收发汇总
	        component: require('@/pages/stock/goodssummary/List'),
        },
        
        
        {
	        path: '/createorder',//创建订单
	        component: require('@/pages/order/CreateOrder'),
        },
        {
	        path: '/orderlist',//订单列表
	        component: require('@/pages/order/OrderList'),
        },
        {
	        path: '/personalorder',//个人订单
	        component: require('@/pages/order/PersonalOrder'),
        },
        {
	        path: '/orderdetail',//订单详情
	        component: require('@/pages/order/OrderDetail'),
        },
        {
	        path: '/ordersummary',//订单
	        component: require('@/pages/order/OrderSummary'),
        },
        
        {
	        path: '/goodslist',//商品列表
	        component: require('@/pages/goods/GoodsList'),
        },
        {
	        path: '/creategoods',//新增商品
	        component: require('@/pages/goods/CreateGoods'),
        },
        {
	        path: '/updategoods',//修改商品详情
	        component: require('@/pages/goods/UpdateGoods'),
        },
        {
	        path: '/multipleInputGoods',//批量导入商品
	        component: require('@/pages/goods/MultipleInputGoods'),
        },
        {
	        path: '/multipleInputImgs',//批量导入图片
	        component: require('@/pages/goods/MultipleInputImgs'),
        },
        
        {
	        path: '/personcenter',//修改商品详情
	        component: require('@/pages/user/PersonCenter'),
        },
        
        {
	        path: '/user/authority',//用户权限
	        component: require('@/pages/personal/security/Authority'),
        },
        {
	        path: '/user/changeEmail',//修改邮箱
	        component: require('@/pages/personal/security/ChangeEmail'),
        },
        {
	        path: '/user/changePassword',//修改密码
	        component: require('@/pages/personal/security/ChangePassword'),
        },
        {
	        path: '/user/changephone',//修改手机
	        component: require('@/pages/personal/security/ChangePhone'),
        },
        {
	        path: '/user/security',//账户安全
	        component: require('@/pages/personal/security/Security'),
        },
      ]
    },
  ]
})
